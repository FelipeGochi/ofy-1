from authentication.models import User
from django.db import models


class Objective(models.Model):
    objective = models.CharField(max_length=240)
    dateObjective = models.DateField(auto_now=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=True)
    done = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dificulty = models.CharField(max_length=1, choices=(
        ('D', 'Díficil'),
        ('M', 'Médio'),
        ('F', 'Fácil'),
        ('S', 'Super Fácil')
    ), default='S')
