from rest_framework import status
from rest_framework.response import Response
from djangoRestPattern import errors as er
from djangoRestPattern import variables as var
from djangoRestPattern.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
import string
import random


class TokenGenerator:
    def get(self, size=24, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    def url(self, tokenType):
        path = {
            'V': 'app/verify',
            'R': 'app/recovery'
        }

        return f'{path[tokenType]}'


class SuccessResponse(Response):
    def __init__(self, successBody, data={}, status=status.HTTP_200_OK):
        data['success'] = {
            "status_code": status,
            "detail": successBody["message"],
            "code": successBody["code"],
            "severity": successBody["severity"],
            "title": successBody["title"]
        }
        super().__init__(data=data)


class EmailHelper:

    def send(self, subject, message, to, html_message, successBody):
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=EMAIL_HOST_USER,
                recipient_list=[to],
                fail_silently=False,
                html_message=html_message
            )
            return SuccessResponse(successBody)

        except Exception as e:
            print(e, to)
            error = var.ERRORS.EMAIL_SEND_ERROR

            return er.APIExceptionDetail().get(
                status.HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )


class Optional:

    def __is_exception(self,
                       parameter=None,
                       polarity=False,
                       condition='',
                       error=None,
                       callback=False):
        if callback:
            if self.exception is not None:
                return self.exception
            elif self.object is not None:
                return self.object

        if parameter is not None and self.object is not None:
            if not getattr(self.object, parameter):
                self.exception = error

        elif condition is not '':
            if polarity:
                if self.object is condition:
                    self.exception = error
            else:
                if self.object is not condition:
                    self.exception = error
        return self

    def __verify(self, function=None):
        if (function is not None
            and self.object is not None
                and self.exception is None):
            self.object = function(self.object)

        return self.__is_exception(callback=True)

    def make(self, function=None):
        return self.__verify(function)

    def alsoVerify(self, newObject):
        if (self.exception is not None):
            return self

        self.object = newObject

        return self

    def _is(self, parameter, error_definition):
        if (self.exception is not None):
            return self

        return self.__is_exception(
            parameter=parameter,
            error=er.APIExceptionDetail().get(
                status.HTTP_403_FORBIDDEN,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title']))

    def is_verify(self, error_definition):
        if (self.exception is not None):
            return self

        return self.__is_exception(
            parameter='is_verify',
            error=er.APIExceptionDetail().get(
                status.HTTP_403_FORBIDDEN,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title']))

    def is_active(self, error_definition):
        if (self.exception is not None):
            return self

        return self.__is_exception(
            parameter='is_active',
            error=er.APIExceptionDetail().get(
                status.HTTP_403_FORBIDDEN,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title']))

    def is_null(self, error_definition):
        if (self.exception is not None):
            return self

        return self.__is_exception(
            polarity=True,
            condition=None,
            error=er.APIExceptionDetail().get(
                status.HTTP_404_NOT_FOUND,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title']))

    def is_equals(self, error_definition, objectCompare):
        if (self.exception is not None):
            return self

        if (self.object != objectCompare):
            self.error = er.APIExceptionDetail().get(
                status.HTTP_404_NOT_FOUND,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title'])

        return self

    def build(self, function):
        if (self.exception is not None):
            return self

        return function(self.object)

    def execute(self, function, params=[], error_definition=None):
        if (self.exception is not None):
            return self

        try:
            if len(params) > 0:
                self.object = function(
                    self.object, *params)
            else:
                self.object = function(self.object)
        except Exception as ex:
            print(ex)
            self.error = er.APIExceptionDetail().get(
                status.HTTP_404_NOT_FOUND,
                error_definition['message'],
                error_definition['code'],
                error_definition['severity'],
                error_definition['title'])

        return self

    def get(self):
        return self

    def set_execption(self, error):
        self.exception = error

        return self

    def httpReponse(self, response):
        if (self.exception is not None):
            return self.exception

        return response

    def __init__(self, object, error=None):
        self.object = object
        self.exception = None


class Http:
    def __init__(self, request):
        self.request = request

    def get_properties(self, properties):
        return list(map(lambda property:
                        self.get_property(property),
                        properties))

    def get_property(self, property):
        return self.request.data.get(property)

    def get_query_params(self, params):
        return list(map(lambda param:
                        self.get_query_param(param),
                        params))

    def get_query_param(self, param):
        return self.request.query_params.get(param)

    def get_headers(self, params):
        return list(map(lambda param:
                        self.get_header(param),
                        params))

    def get_header(self, param):
        return self.request.headers.get(param)
