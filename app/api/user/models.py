from authentication.models import User
from django.db import models


class Token(models.Model):
    token = models.CharField(max_length=24)
    type = models.CharField(max_length=1, choices=(
        ('R', 'Recovery'),
        ('A', 'Active')
    ))
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
