from api.task.service import TaskService
from rest_framework.response import Response
from api.goal.models import Goal
from api.task.models import Task
from api.goal.serializers import GoalSerializer
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from djangoRestPattern import functions as fn
from djangoRestPattern import variables as var
from djangoRestPattern import errors as er
from django.conf import settings
from django.core.paginator import Paginator


class GoalService:
    def __init__(self, request):
        self.request = request

    def list(self, idObjective):
        page = int(fn.Http(
            self.request).get_query_param('page'))

        goals = Goal.objects.filter(
            objective__id=idObjective,
            isActive=True).order_by('done',
                                    'dateGoal',
                                    'goal',)

        paginator = Paginator(goals, 5, allow_empty_first_page=True)

        try:
            next = paginator.page(page).next_page_number()
        except:
            next = 0

        goalsDTO = list(map(lambda goal:
                            GoalSerializer(goal).data,
                            paginator.get_page(page).object_list))

        return Response({
            'count': paginator.count,
            'next': next,
            'goals': goalsDTO
        })

    def create(self, idObjective):
        goal, dateGoal = fn.Http(
            self.request).get_properties([
                'goal',
                'dateGoal'
            ])

        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(goal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dateGoal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__create_goal(idObjective, goal, dateGoal))

    def get(self, idObjective, id):
        goal = Goal.objects.filter(
            objective_id=idObjective).get(pk=id, isActive=True)

        return fn.Optional(id) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(goal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(Response(data={
                'goal': GoalSerializer(goal).data
            }))

    def update(self, idObjective, id):
        goal, dateGoal, description = fn.Http(
            self.request).get_properties([
                'goal',
                'dateGoal',
                'description'
            ])

        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(goal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(dateGoal) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__update_goal(idObjective, id, goal, dateGoal, description))

    def done(self, idObjective, id):
        return fn.Optional(idObjective) \
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .alsoVerify(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__done_goal(idObjective, id))

    def doneAll(self, goals):
        return list(map(lambda goal: self.__save_done_goal(goal), goals))

    def delete(self, idObjective, id):

        return fn.Optional(id)\
            .is_null(var.ERRORS.EMPTY_FIELD) \
            .httpReponse(self.__remove_goal(idObjective, id))

    def __create_goal(self, idObjective, goal, dateGoal):
        try:
            new_goal = Goal.objects.create(
                objective_id=idObjective,
                goal=goal,
                dateGoal=dateGoal)

        except Exception as e:
            print(e, idObjective)
            error = var.ERRORS.GOAL_CREATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        new_goal.dateGoal = fn.Date(new_goal.dateGoal).parse()

        return Response(data={
            'goal': GoalSerializer(new_goal).data
        })

    def __update_goal(self, idObjective, id, goal, dateGoal, description):
        try:
            goal_old = Goal.objects.filter(objective_id=idObjective).get(id=id)

            goal_old.goal = goal
            goal_old.dateGoal = dateGoal
            goal_old.description = description

            goal_old.save(
                update_fields=['goal', 'dateGoal', 'description'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.GOAL_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        goal_old.dateGoal = fn.Date(goal_old.dateGoal).parse()

        return Response(data={
            'goal': GoalSerializer(goal_old).data
        })

    def __done_goal(self, idObjective, id):
        try:
            goal_old = Goal.objects.filter(objective_id=idObjective).get(id=id)

            goal = self.__save_done_goal(goal_old)
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

        goal.dateGoal = goal.dateGoal.strftime("%Y/%m/%d")

        return Response(data={
            'goal': GoalSerializer(goal).data
        })

    def __save_done_goal(self, goal):
        goal.done = True

        taskFilter = Task.objects.filter(goal_id=goal.id)

        if taskFilter:
            TaskService(self.request).doneAll(taskFilter)

        goal.save(
            update_fields=['done'])

        return goal

    def __remove_goal(self, idObjective, id):
        try:
            goal_old = Goal.objects.filter(objective_id=idObjective).get(id=id)

            goal_old.isActive = False

            goal_old.save(
                update_fields=['isActive'])
        except Exception as e:
            print(e, id)
            error = var.ERRORS.GOAL_UPDATE

            return er.APIExceptionDetail().get(
                HTTP_500_INTERNAL_SERVER_ERROR,
                error['message'],
                error['code'],
                error['severity'],
                error['title']
            )

        return Response()
