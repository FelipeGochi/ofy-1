from api.goal.models import Goal
from rest_framework.serializers import ModelSerializer, DateField


class GoalSerializer(ModelSerializer):
    dateGoal = DateField(format="%Y/%m/%d", input_formats=['%Y/%m/%d'])

    class Meta:
        model = Goal
        fields = ['id', 'goal', 'dateGoal',
                  'description', 'objective_id', 'done']
