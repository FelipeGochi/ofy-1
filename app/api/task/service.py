from rest_framework.response import Response
from api.task.models import Task
from api.task.serializers import TaskSerializer
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from djangoRestPattern import functions as fn
from djangoRestPattern import variables as var
from djangoRestPattern import errors as er


class TaskService:
    def __init__(self, request):
        self.request = request

    def list(self, idObjective, idGoal):
        tasks = Task.objects.filter(
            goal__id=idGoal,
            goal__objective__id=idObjective,
            isActive=True)

        tasksDTO = list(map(lambda task:
                            TaskSerializer(task).data,
                            tasks))

        return Response({
            'tasks': tasksDTO
        })

    def create(self, idObjective, idGoal):
        task, description = fn.Http(
            self.request).get_properties([
                'task',
                'description'
            ])

        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(idGoal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(task) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__create_task(idObjective, idGoal, task, description))

    def get(self, idObjective, idGoal, id):
        task = Task.objects.filter(
            goal__id=idGoal,
            goal__objective__id=idObjective).get(pk=id,
                                                 isActive=True)

        return fn.Optional(id) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(task) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(Response(data={
                'task': TaskSerializer(task).data
            }))

    def update(self, idObjective, idGoal, id):
        task, description = fn.Http(
            self.request).get_properties([
                'task',
                'description'
            ])

        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(idGoal)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(task) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__update_task(idObjective, idGoal, id, task, description))

    def done(self, idObjective, idGoal, id):
        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(idGoal)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__done_task(idObjective, idGoal, id))

    def doneAll(self, tasks):
        return list(map(lambda task: self.__save_done_task(task), tasks))

    def delete(self, idObjective, idGoal, id):

        return fn.Optional(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(idGoal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__remove_task(idObjective, idGoal, id))

    def __create_task(self, idObjective, idGoal, task, description):
        try:
            task = Task.objects.create(
                goal_id=idGoal,
                task=task,
                description=description)

        except Exception as e:
            print(e, idObjective)
            error = var.ERRORS.OBJECTIVE_CREATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response(data={
            'task': TaskSerializer(task).data
        })

    def __update_task(self, idObjective, idGoal, id, task, description):
        try:
            task_old = Task.objects.filter(
                goal__id=idGoal,
                goal__objective__id=idObjective).get(id=id)

            task_old.task = task
            task_old.description = description

            task_old.save(
                update_fields=['task', 'description'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.USER_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response(data={
            'task': TaskSerializer(task_old).data
        })

    def __done_task(self, idObjective, idGoal, id):
        try:
            task_old = Task.objects.filter(
                goal__id=idGoal,
                goal__objective__id=idObjective).get(id=id)

            task = self.__save_done_task(task_old)
        except Exception as e:
            print(e, id)
            error = var.ERRORS.USER_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response(data={
            'task': TaskSerializer(task).data
        })

    def __save_done_task(self, task):
        task.done = True

        task.save(
            update_fields=['done'])

        return task

    def __remove_task(self, idObjective, idGoal, id):
        try:
            task_old = Task.objects.filter(
                goal__id=idGoal,
                goal__objective__id=idObjective).get(id=id)

            task_old.isActive = False

            task_old.save(
                update_fields=['isActive'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.USER_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response()
