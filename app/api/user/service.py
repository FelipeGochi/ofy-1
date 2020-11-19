from api.user.serializers import UserSerializer
from api.user.models import Token
from django.template import loader
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_500_INTERNAL_SERVER_ERROR
from djangoRestPattern import functions as fn
from djangoRestPattern import variables as var
from djangoRestPattern import errors as er
from django.contrib.auth.models import User as DjangoUser
from authentication.models import Person
from django.template import loader
from django.conf import settings
from oauth2_provider.models import AccessToken

class User:
    def __init__(self, request):
        self.request = request

    def get(self, token=None):
        if token == None:
            bearer = fn.Http(
                self.request).get_header('Authorization')

            token = bearer.split(' ')[1]

        return self.__get_access_token(token) \
            .make(self.__dto)

    def create(self):
        name, lastName, username, password, password_confirmation = fn.Http(
            self.request).get_properties([
                'name',
                'lastName',
                'username',
                'password',
                'passwordConfirmation'
            ])

        return fn.Optional(name) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(lastName) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(username) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(password) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .is_equals(var.ERRORS.USER_PASSWORD_NOT_MATCH, password_confirmation) \
            .httpReponse(self.__create_user(
                name,
                lastName,
                username,
                password))

    def update(self, id):
        name, lastName = fn.Http(
            self.request).get_properties([
                'firstName',
                'lastName'
            ])

        return fn.Optional(id) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(name) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(lastName) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__update_user(
                id,
                name,
                lastName))

    def recovery(self):
        password, token = fn.Http(
            self.request).get_properties(['password', 'token'])

        return self.__get_token(token, 'R') \
            .execute(function=self.__change_password, params=[password, 'R']) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(
                fn.SuccessResponse(
                    var.SUCCESS.RECOVERY_SUCCESS))

    def password_recovery(self):
        email = fn.Http(
            self.request).get_property('email')

        return fn.Optional(email) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .build(self.__get_by_email)

    def verify(self):
        token = fn.Http(
            self.request).get_property('token')

        return self.__get_token(token, 'V') \
            .execute(function=self.__verify_user, params=['V']) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(
                fn.SuccessResponse(
                    var.SUCCESS.USER_VERIFY))

    def __dto(self, user):
        return fn.SuccessResponse(
            var.SUCCESS.USER_VERIFY, {
                'user': UserSerializer(user).data
            })

    def __get_access_token(self, token):
        access_token = fn.Optional(token) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(AccessToken.objects.get(token=token)) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .get()

        if access_token.object.is_expired():
            return access_token.set_execption(er.APIExceptionDetail()
                                              .get_exception(HTTP_403_FORBIDDEN,
                                                             var.ERRORS.INVALID_TOKEN))

        return access_token.build(self.__get_user)

    def __get_token(self, token, token_type):
        return fn.Optional(Token.objects.get(token=token, type=token_type)) \
            ._is('active', var.ERRORS.INVALID_TOKEN) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .build(self.__get_user)

    def __get_user(self, token):
        return fn.Optional(token.user) \
            .is_null(var.ERRORS.USER_NOT_EXIST) \
            .is_active(var.ERRORS.USER_IS_NOT_ACTIVE) \
            .get()

    def __change_password(self, user, password, token_type):
        user.set_password(password)
        user.save()

        self.__active_token(user, token_type)

        return user

    def __get_by_email(self, email):
        try:
            person = Person.objects \
                .select_related('user') \
                .filter(user__is_active=True) \
                .get(user__email=email)
        except Exception as e:
            print(e, email)
            error = var.ERRORS.PASSWORD_RECOVERY_USER_NOT_EXIST

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return fn.Optional(person.user) \
            .is_null(var.ERRORS.USER_NOT_EXIST) \
            .is_active(var.ERRORS.USER_IS_NOT_ACTIVE) \
            .httpReponse(self.__send_email_with_token(person.user, var.OBJECT.RECOVERY_EMAIL))

    def __send_email_with_token(self, user, email_props):

        tokenGenerator = fn.TokenGenerator()
        tokenBuild = tokenGenerator.get()
        tokenType = email_props['tokenType']

        html_message = loader.render_to_string('server/email.html', {
            'objective_title': email_props['title'],
            'objective_sub_title': email_props['sub_title'],
            'objective_message': email_props['message'],
            'objective_url': f'{settings.URL_DEFAULT}/{tokenGenerator.url(tokenType)}/{tokenBuild}/',
            'objective_button': email_props['button']
        })

        response = fn.EmailHelper().send(email_props['subject'],
                                         email_props['message_email'],
                                         user.email,
                                         html_message,
                                         email_props['success'])

        if response.status_code != HTTP_200_OK:
            return response

        Token.objects.create(
            token=tokenBuild, type=tokenType, user=user)

        return response

    def __create_user(self,
                      name,
                      lastName,
                      username,
                      password):
        try:
            try:
                userFilter = DjangoUser.objects.get(email=username)

                user = userFilter
                user.set_password(password)
                user.save()

                request = fn.SuccessResponse(var.SUCCESS.USER_CREATE)

            except DjangoUser.DoesNotExist:
                user = DjangoUser.objects.create_user(username=username,
                                                      email=username,
                                                      password=password,
                                                      first_name=name,
                                                      last_name=lastName)

                request = self.__send_email_with_token(
                    user=user, email_props=var.OBJECT.VERIFY_EMAIL)

        except Exception as e:
            print(e, username)
            error = var.ERRORS.USER_CREATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        try:
            person = Person.objects.get(user=user)
        except Person.DoesNotExist:
            person = Person.objects.create(user=user)

        request.data['item'] = UserSerializer(user).data

        return request

    def __update_user(self,
                      id,
                      name,
                      last_name):
        try:
            user = DjangoUser.objects.get(id=id)

            user.first_name = name
            user.last_name = last_name

            user.save(update_fields=['first_name', 'last_name'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.USER_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return fn.SuccessResponse(var.SUCCESS.USER_UPDATE,
                                  data={'user': UserSerializer(user).data})

    def __verify_user(self, user, token_type):
        person = Person.objects.select_related('user') \
            .filter(user__is_active=True) \
            .get(user__id=user.id)
        person.is_verify = True
        person.save()

        self.__active_token(user=user, token_type=token_type)

        return person

    def __active_token(self, user, token_type):
        token = Token.objects.select_related('user') \
            .filter(user__is_active=True) \
            .filter(active=True) \
            .get(user__id=user.id, type=token_type)
        token.active = False
        token.save()
