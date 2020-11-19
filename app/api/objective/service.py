from api.goal.service import GoalService
from api.goal.models import Goal
from rest_framework.response import Response
from api.user.service import User
from api.objective.models import Objective
from api.objective.serializers import ObjectiveSerializer
from django.template import loader
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_500_INTERNAL_SERVER_ERROR
from djangoRestPattern import functions as fn
from djangoRestPattern import variables as var
from djangoRestPattern import errors as er
from authentication.models import Person
from django.conf import settings


class ObjectiveService:
    def __init__(self, request):
        self.request = request
        self.user = User(self.request).get().data['user']

    def list(self):
        objectives = Objective.objects.filter(
            user__id=self.user['id'], isActive=True)

        objectivesDTO = list(map(lambda objective:
                                 ObjectiveSerializer(objective).data,
                                 objectives))

        return Response({
            'objectives': objectivesDTO
        })

    def create(self):
        objective, dateObjective, dificulty = fn.Http(
            self.request).get_properties([
                'objective',
                'dateObjective',
                'dificulty'
            ])

        return fn.Optional(objective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dateObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dificulty) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__create_objective(objective, dateObjective, dificulty))

    def get(self, id):
        objective = Objective.objects.get(pk=id, isActive=True)

        return fn.Optional(id) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(objective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(Response(data={
                'objective': ObjectiveSerializer(objective).data
            }))

    def update(self, id):
        objective, dateObjective, dificulty = fn.Http(
            self.request).get_properties([
                'objective',
                'dateObjective',
                'dificulty'
            ])

        return fn.Optional(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(objective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dateObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dificulty) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__update_objective(id, objective, dateObjective, dificulty))

    def done(self, id):
        return fn.Optional(id) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__done_objective(id))

    def delete(self, id):

        return fn.Optional(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__remove_objective(id))

    def __create_objective(self, objective, dateObjective, dificulty):
        try:
            objective = Objective.objects.create(
                user_id=self.user['id'],
                objective=objective,
                dateObjective=dateObjective,
                dificulty=dificulty)

        except Exception as e:
            print(e, self.user['email'])
            error = var.ERRORS.OBJECTIVE_CREATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response(data={
            'objective': ObjectiveSerializer(objective).data
        })

    def __update_objective(self, id, objective, dateObjective, dificulty):
        try:
            objective_old = Objective.objects.get(id=id)

            objective_old.objective = objective
            objective_old.dateObjective = dateObjective
            objective_old.dificulty = dificulty

            objective_old.save(
                update_fields=['objective', 'dateObjective', 'dificulty'])
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
            'objective': ObjectiveSerializer(objective_old).data
        })

    def __done_objective(self, id):
        try:
            objective_old = Objective.objects.get(id=id)

            objective_old.done = True

            goalsFilter = Goal.objects.filter(objective_id=objective_old.id)

            if goalsFilter:
                GoalService(self.request).doneAll(goalsFilter)

            objective_old.save(
                update_fields=['done'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.GOAL_DONE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response(data={
            'objective': ObjectiveSerializer(objective_old).data
        })

    def __remove_objective(self, id):
        try:
            objective_old = Objective.objects.get(id=id)

            objective_old.isActive = False

            objective_old.save(
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
