from api.goal.models import Goal
from rest_framework.serializers import ModelSerializer


class GoalSerializer(ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'goal', 'dateGoal', 'description', 'objective_id', 'done']
