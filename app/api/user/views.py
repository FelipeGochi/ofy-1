from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.views import APIView

from . import service


# Create your views here.

class UserAllowAllView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return service.User(request).get()
    
    def post(self, request, *args, **kwargs):
        return service.User(request).create()


class UpdateView(UpdateAPIView):

    def put(self, request, id, *args, **kwargs):
        return service.User(request).update(id)


class PasswordRecoveryView(CreateAPIView, UpdateAPIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        return service.User(request).password_recovery()

    def put(self, request, *args, **kwargs):
        return service.User(request).recovery()


class VerifyView(UpdateAPIView):

    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        return service.User(request).verify()
