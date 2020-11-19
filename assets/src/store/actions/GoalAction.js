import React from "react";
import { Alert } from "../../components/atoms";
import { isNotEmpty } from '../../helpers/functions'
import WithHttpRequest from "../../configs/HttpRequest";
import {
    GOAL_CLEAN_ALERT,
    GOAL_REQUEST,
    GOAL_REQUEST_COMPLETE,
    GOAL_REQUEST_ERROR,
    GOAL_SET,
    GOAL_LIST_SET
} from "./Actions.type";
import { setList as setTaskList } from './TaskAction'

const request = () => ({
    type: GOAL_REQUEST,
    success: null,
    error: null
});

const requestComplete = ({ success }) => {
    if (success)
        success['component'] = (
            <Alert
                severity={success.severity}
                title={success.title}
            >
                {success.detail}
            </Alert>
        )

    return ({
        type: GOAL_REQUEST_COMPLETE,
        success: success || null
    })
};

const requestError = (error) => ({
    type: GOAL_REQUEST_ERROR,
    error: {
        code: error.code,
        message: error.detail,
        severity: error.severity,
        title: error.title,
        component: (
            <Alert
                severity={error.severity}
                title={error.title}
            >
                {error.detail}
            </Alert>
        )
    },
});

export const list = (idObjective) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['goal'])

        const goalList = getState().goal.list.filter(goal => goal['objective_id'] === parseInt(idObjective))

        if (isNotEmpty(goalList)) { dispatch(setList({ goals: goalList })) }
        else {
            const response = await service.goal.list(idObjective)
            const responseData = response.data

            if (response.status == 200) {
                dispatch(setList(responseData))
            } else {
                dispatch(requestError(responseData))
            }
        }

    }
}

export const getGoal = (idObjective, id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const current = getState().goal.list.find(goal => goal.id === id)

        if (current) {
            dispatch(setGoal(current))
        } else {
            const service = WithHttpRequest(['goal'])

            const response = await service.goal.get(idObjective, id)
            const responseData = response.data

            if (response.status == 200) {
                dispatch(setGoal(responseData))
            } else {
                dispatch(requestError(responseData))
            }
        }
    }
}

export const setList = ({ goals }) => {
    return ({
        type: GOAL_LIST_SET,
        // goals: goals.sort((goalCurrent, goalNext) => {
        //     return new Date(goalCurrent.dateGoal) - new Date(goalNext.dateGoal);
        // })
        goals: goals
    })
}

export const setGoal = ({ goal }) => {
    return ({
        type: GOAL_SET,
        goal: goal
    })
}

export const create = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['goal'])

        const response = await service.goal.create(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                goals: [...getState().goal.list, responseData.goal]
            }))
            dispatch(requestComplete(responseData))
            return responseData.goal
        } else {
            dispatch(requestError(responseData))
        }

    }
};

export const update = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['goal'])

        const response = await service.goal.update(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setGoal(responseData))
            dispatch(setList({
                goals: [...getState().goal.list.filter(it => it.id !== responseData.goal.id), responseData.goal]
            }))
            return responseData.goal
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const done = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['goal'])

        const response = await service.goal.done(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setGoal(responseData))
            dispatch(setList({
                goals: [...getState().goal.list.filter(it => it.id !== responseData.goal.id), responseData.goal]
            }))
            dispatch(setTaskList({
                tasks: [...getState().task.list.filter(it => it['goal_id'] === responseData.goal.id).map(task => { task.done = true; return task })]
            }))
            return responseData.goal
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const remove = (idObjective, id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['goal'])

        const response = await service.goal.remove(idObjective, id)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                goals: getState().goal.list
                    .filter(it => parseInt(it.id) !== parseInt(id))
            }))
            dispatch(requestComplete({}))
            return true
        } else {
            dispatch(requestError(responseData))
        }
    }
}

export const cleanGoalAlert = () => ({
    type: GOAL_CLEAN_ALERT,
    success: null,
    error: null
})