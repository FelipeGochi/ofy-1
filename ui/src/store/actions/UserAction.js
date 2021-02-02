import React from "react";
import { Alert } from "../../components/atoms";
import WithHttpRequest from "../../configs/HttpRequest";
import { isEquals } from '../../helpers/functions';
import { USER_CLEAN_ALERT, USER_REQUEST, USER_REQUEST_COMPLETE, USER_REQUEST_ERROR, USER_SET } from "./Actions.type";
import { cleanLoginAuthentication } from "./AuthAction";

const request = () => ({
    type: USER_REQUEST,
    success: null,
    error: null
});

const requestComplete = ({ success }) => {
    success['component'] = (
        <Alert
            severity={success.severity}
            title={success.title}
        >
            {success.detail}
        </Alert>
    )

    return ({
        type: USER_REQUEST_COMPLETE,
        success: success
    })
};

const requestError = (error) => ({
    type: USER_REQUEST_ERROR,
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

export const getUser = () => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.get()
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(setUser(responseData))
        } else {
            localStorage.removeItem("TOKEN")
            localStorage.removeItem("PROVIDER")
            dispatch(cleanLoginAuthentication())
        }
    }
}

export const setUser = ({ user }) => {
    return ({
        type: USER_SET,
        id: user['id'],
        email: user['email'],
        firstName: user['first_name'],
        lastName: user['last_name']
    })
}

export const create = (data) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.create(data)
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(requestComplete(responseData))
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const update = (data) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.update(data)
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(requestComplete(responseData))
            dispatch(setUser(responseData))

            return responseData
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const recovery = (data) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.recovery(data)
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(requestComplete(responseData))
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const passwordRecovery = ({ email }) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.passwordRecovery(email)
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(requestComplete(responseData))
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const verify = (token) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['user'])

        const response = await service.user.verify(token)
        const responseData = response.data

        if (isEquals(response.status, 200)) {
            dispatch(requestComplete(responseData))
        } else {
            dispatch(requestError(responseData))
        }
    }
};

export const cleanUserAlert = () => ({
    type: USER_CLEAN_ALERT,
    success: null,
    error: null
})