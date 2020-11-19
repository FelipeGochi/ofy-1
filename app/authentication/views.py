from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http.response import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from . import service
from rest_framework_social_oauth2.views import ConvertTokenView, TokenView, RevokeTokenView

# Create your views here.


class SocialLoginView(ConvertTokenView):
    def post(self, request, *args, **kwargs):
        return service.Authentication(request, super().post).social_login()


class LoginView(TokenView):
    def post(self, request, *args, **kwargs):
        return service.Authentication(request, super().post).login()


class LogoutView(RevokeTokenView):
    def post(self, request, *args, **kwargs):
        return service.Authentication(request, super().post).logout()
