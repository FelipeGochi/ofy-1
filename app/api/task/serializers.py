from api.task.models import Task
from rest_framework.serializers import ModelSerializer


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task', 'goal_id', 'description', 'done']
