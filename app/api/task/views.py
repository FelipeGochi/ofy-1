from rest_framework.views import APIView

from . import service


# Create your views here.

class GenericView(APIView):
    def get(self, request, idObjective, idGoal, *args, **kwargs):
        return service.TaskService(request).list(idObjective, idGoal)

    def post(self, request, idObjective, idGoal, *args, **kwargs):
        return service.TaskService(request).create(idObjective, idGoal)


class SpecificView(APIView):
    def get(self, request, idObjective, idGoal, id, *args, **kwargs):
        return service.TaskService(request).get(idObjective, idGoal, id)

    def put(self, request, idObjective, idGoal, id, *args, **kwargs):
        return service.TaskService(request).update(idObjective, idGoal, id)

    def patch(self, request, idObjective, idGoal, id, *args, **kwargs):
        return service.TaskService(request).done(idObjective, idGoal, id)

    def delete(self, request, idObjective, idGoal, id, *args, **kwargs):
        return service.TaskService(request).delete(idObjective, idGoal, id)
