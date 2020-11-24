import React from "react";
import { Alert } from "../../components/atoms";
import { isNotEmpty } from '../../helpers/functions'
import WithHttpRequest from "../../configs/HttpRequest";
import {
    TASK_CLEAN_ALERT,
    TASK_REQUEST,
    TASK_REQUEST_COMPLETE,
    TASK_REQUEST_ERROR,
    TASK_SET,
    TASK_LIST_SET
} from "./Actions.type";

const request = () => ({
    type: TASK_REQUEST,
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
        type: TASK_REQUEST_COMPLETE,
        success: success || null
    })
};

const requestError = (error) => ({
    type: TASK_REQUEST_ERROR,
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

export const list = (idObjective, idGoal) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['task'])

        const taskList = getState().task.list.filter(task => task['goal_id'] === parseInt(idGoal))

        if (isNotEmpty(taskList)) { dispatch(setList({ tasks: taskList })) }
        else {
            const response = await service.task.list(idObjective, idGoal)
            const responseData = response.data

            if (response.status == 200) {
                dispatch(setList(responseData))
            } else {
                dispatch(requestError(responseData))
            }
        }

    }
}

export const getGoal = (idObjective, idGoal, id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const current = getState().task.list.find(task => task.id === id)

        if (current) {
            dispatch(setGoal(current))
        } else {
            const service = WithHttpRequest(['task'])

            const response = await service.task.get(idObjective, idGoal, id)
            const responseData = response.data

            if (response.status == 200) {
                dispatch(setGoal(responseData))
            } else {
                dispatch(requestError(responseData))
            }
        }
    }
}

export const setList = ({ tasks }) => {
    return ({
        type: TASK_LIST_SET,
        // tasks: tasks.sort((taskCurrent, taskNext) => {
        //     return new Date(taskCurrent.dateGoal) - new Date(taskNext.dateGoal);
        // })
        tasks: tasks
    })
}

export const setGoal = ({ task }) => {
    return ({
        type: TASK_SET,
        task: task
    })
}

export const create = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['task'])

        const response = await service.task.create(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                tasks: [...getState().task.list, responseData.task]
            }))
            dispatch(requestComplete(responseData))
            return responseData.task
        } else {
            dispatch(requestError(responseData))
        }

    }
};

export const update = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['task'])

        const response = await service.task.update(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setGoal(responseData))
            dispatch(setList({
                tasks: [...getState().task.list.filter(it => it.id !== responseData.task.id), responseData.task]
            }))
            return responseData.task
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const done = (data) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['task'])

        const response = await service.task.done(data)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(requestComplete(responseData))
            dispatch(setGoal(responseData))
            dispatch(setList({
                tasks: [...getState().task.list.filter(it => it.id !== responseData.task.id), responseData.task]
            }))
            return responseData.task
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const remove = (idObjective, idGoal, id) => {
    return async (dispatch, getState) => {
        dispatch(request())

        const service = WithHttpRequest(['task'])

        const response = await service.task.remove(idObjective, idGoal, id)
        const responseData = response.data

        if (response.status == 200) {
            dispatch(setList({
                tasks: getState().task.list
                    .filter(it => parseInt(it.id) !== parseInt(id))
            }))
            dispatch(requestComplete({}))
            return true
        } else {
            dispatch(requestError(responseData))
        }
    }
}

export const cleanTaskAlert = () => ({
    type: TASK_CLEAN_ALERT,
    success: null,
    error: null
})