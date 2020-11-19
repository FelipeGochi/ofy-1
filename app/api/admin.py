from .models import Token, Objective, Goal, Task
from django.contrib import admin

# Register your models here.
@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    pass


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    pass


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    pass

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass

