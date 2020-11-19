from api.goal.models import Goal
from django.db import models


class Task(models.Model):
    task = models.CharField(max_length=240)
    description = models.CharField(max_length=2500, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=True)
    done = models.BooleanField(default=False)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
