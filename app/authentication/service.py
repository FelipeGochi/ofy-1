from api.user.service import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User as DjangoUser
from djangoRestPattern import functions as fn
from djangoRestPattern import variables as var
from authentication.models import Person


class Authentication:

    def __init__(self, request, jwt=None):
        self.request = request
        self.jwt = jwt

    def __generate_jwt(self, person):
        response = self.jwt(self.request)
        response.data['user'] = {
            'email': person.user.email,
            'first_name': person.user.first_name,
            'last_name': person.user.last_name
        }
        return response

    def social_login(self):
        response = self.jwt(self.request)

        userResponse = User(self.request).get(
            response.data['access_token']).data['user']

        user = DjangoUser.objects.get(id=userResponse['id'])
        user.username = user.email
        user.save(update_fields=['username'])

        try:
            person = Person.objects.get(user=user)
            if not person.is_verify:
                person.is_verify = True
                person.save(update_fields=['is_verify'])
        except Person.DoesNotExist:
            person = Person.objects.create(user=user, is_verify=True)

        return response

    def login(self):
        username, password = fn.Http(
            self.request).get_properties(['username',
                                          'password'])

        user = authenticate(self.request,
                            username=username,
                            password=password)

        return fn.Optional(username) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(password) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(user) \
            .is_null(var.ERRORS.USER_NOT_EXIST) \
            .is_active(var.ERRORS.USER_IS_NOT_ACTIVE) \
            .make(self.__get_person)

    def logout(self):
        logout(request=self.request)
        return self.jwt(self.request)

    def __get_person(self, user):
        person = Person.objects.get(user=user)

        return fn.Optional(person) \
            .is_null(var.ERRORS.USER_NOT_EXIST) \
            .is_verify(var.ERRORS.USER_IS_NOT_VERIFY) \
            .make(self.__generate_jwt)
