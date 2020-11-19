from api.objective.models import Objective
from rest_framework.serializers import ModelSerializer


class ObjectiveSerializer(ModelSerializer):
    class Meta:
        model = Objective
        fields = ['id', 'objective', 'dateObjective',
                  'dificulty', 'done', 'updated']
