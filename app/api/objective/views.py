from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.views import APIView

from . import service


# Create your views here.

class GenericView(APIView):
    def get(self, request, *args, **kwargs):
        return service.ObjectiveService(request).list()

    def post(self, request, *args, **kwargs):
        return service.ObjectiveService(request).create()


class SpecificView(APIView):
    def get(self, request, id, *args, **kwargs):
        return service.ObjectiveService(request).get(id)

    def put(self, request, id, *args, **kwargs):
        return service.ObjectiveService(request).update(id)
    
    def patch(self, request, id, *args, **kwargs):
        return service.ObjectiveService(request).done(id)

    def delete(self, request, id, *args, **kwargs):
        return service.ObjectiveService(request).delete(id)