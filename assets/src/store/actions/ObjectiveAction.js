import React from "react";
import { Alert } from "../../components/atoms";
import { isNotEmpty } from '../../helpers/functions'
import WithHttpRequest from "../../configs/HttpRequest";
import {
    OBJECTIVE_CLEAN_ALERT,
    OBJECTIVE_REQUEST,
    OBJECTIVE_REQUEST_COMPLETE,
    OBJECTIVE_REQUEST_ERROR,
    OBJECTIVE_SET,
    OBJECTIVE_LIST_SET,
    OBJECTIVE_SET_PAGE
} from "./Actions.type";
import { setList as setGoalList } from './GoalAction'
import { setList as setTaskList } from './TaskAction'

const request = () => ({
    type: OBJECTIVE_REQUEST,
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
        type: OBJECTIVE_REQUEST_COMPLETE,
        success: success || null
    })
};

const requestError = (error) => ({
    type: OBJECTIVE_REQUEST_ERROR,
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

export const list = () => {
    return async (dispatch, getState) => {
        if (isNotEmpty(getState().objective.list) &&
            getState().objective.list.length === getState().objective.total) return

        dispatch(request())

        const service = WithHttpRequest(['objective'])

        const response = await service.objective.list(getState().objective.page)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList(responseData, getState().objective.list))
        } else {
            dispatch(requestError(responseData))
        }
    }
}

export const getObjective = (id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const current = getState().objective.list.find(objective => objective.id === id)

        if (current) {
            dispatch(setObjective(current))
        } else {
            const service = WithHttpRequest(['objective'])

            const response = await service.objective.get(id)
            const responseData = response.data

            if (response.status == 200) {
                dispatch(setObjective(responseData))
            } else {
                dispatch(requestError(responseData))
            }
        }
    }
}

export const setList = ({ objectives, count, next }, currentList) => {
    const list = Array.from(new Set([...currentList, ...objectives]
        .map(JSON.stringify)))
        .map(JSON.parse)

    return ({
        type: OBJECTIVE_LIST_SET,
        objectives: list,
        total: count || list.length,
        next: next || 1
    })
}

export const setObjective = ({ objective }) => {
    return ({
        type: OBJECTIVE_SET,
        objective: objective
    })
}

export const create = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['objective'])

        const response = await service.objective.create(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                objectives: [responseData.objective]
            }, getState().objective.list))
            dispatch(requestComplete(responseData))
            return responseData.objective
        } else {
            dispatch(requestError(responseData))
        }

    }
};

export const update = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['objective'])

        const response = await service.objective.update(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setObjective(responseData))
            dispatch(setList({
                objectives: [responseData.objective]
            }, getState().objective.list.filter(it => it.id !== responseData.objective.id)))
            return responseData.objective
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const done = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['objective'])

        const response = await service.objective.done(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setObjective(responseData))
            dispatch(setList({
                objectives: [responseData.objective]
            }, getState().objective.list.filter(it => it.id !== responseData.objective.id)))

            isNotEmpty(getState().goal.list)
                && dispatch(setGoalList({
                    goals: [...getState().goal.list.filter(it => it['objective_id'] === responseData.objective.id)
                        .map(goal => { goal.done = true; return goal })]
                }, []))

            isNotEmpty(getState().goal.list)
                && isNotEmpty(getState().task.list)
                && dispatch(setTaskList({
                    tasks: [...getState().goal.list.map(goal => getState().task.list
                        .filter(it => it['goal_id'] === goal.id)
                        .map(task => { task.done = true; return task }))]
                }))
            return responseData.objective
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const remove = (id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['objective'])

        const response = await service.objective.remove(id)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                objectives: getState().objective.list
                    .filter(it => parseInt(it.id) !== parseInt(id))
            }, []))
            dispatch(requestComplete({}))
            return true
        } else {
            dispatch(requestError(responseData))
        }
    }
}

export const cleanObjectiveAlert = () => ({
    type: OBJECTIVE_CLEAN_ALERT,
    success: null,
    error: null
})