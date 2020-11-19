from rest_framework.views import APIView

from . import service


# Create your views here.

class GenericView(APIView):
    def get(self, request, idObjective, *args, **kwargs):
        return service.GoalService(request).list(idObjective)

    def post(self, request, idObjective, *args, **kwargs):
        return service.GoalService(request).create(idObjective)


class SpecificView(APIView):
    def get(self, request, idObjective, id, *args, **kwargs):
        return service.GoalService(request).get(idObjective, id)

    def put(self, request, idObjective, id, *args, **kwargs):
        return service.GoalService(request).update(idObjective, id)

    def patch(self, request, idObjective, id, *args, **kwargs):
        return service.GoalService(request).done(idObjective, id)

    def delete(self, request, idObjective, id, *args, **kwargs):
        return service.GoalService(request).delete(idObjective, id)
