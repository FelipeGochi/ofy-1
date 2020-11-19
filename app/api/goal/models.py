from api.objective.models import Objective
from django.db import models


class Goal(models.Model):
    goal = models.CharField(max_length=240)
    dateGoal = models.DateField(auto_now=False)
    description = models.CharField(max_length=2500, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=True)
    done = models.BooleanField(default=False)
    objective = models.ForeignKey(Objective, on_delete=models.CASCADE)
    dificulty = models.CharField(max_length=1, choices=(
        ('D', 'Díficil'),
        ('M', 'Médio'),
        ('F', 'Fácil'),
        ('S', 'Super Fácil')
    ), default='S')
