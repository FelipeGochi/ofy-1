from api.objective.models import Objective
from rest_framework.serializers import ModelSerializer, DateField


class ObjectiveSerializer(ModelSerializer):
    dateObjective = DateField(format="%Y/%m/%d", required=False, read_only=True)

    class Meta:
        model = Objective
        fields = ['id', 'objective', 'dateObjective',
                  'dificulty', 'done', 'updated']
