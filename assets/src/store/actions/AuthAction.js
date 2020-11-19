import React from "react";
import { Alert } from "../../components/atoms";
import { setUser } from '../actions/UserAction'

import WithHttpRequest from "../../configs/HttpRequest";
import { LOGIN_REQUEST, LOGIN_REQUEST_COMPLETE, LOGIN_REQUEST_ERROR, LOGIN_CLEAN_ALERT, LOGIN_CLEAN_AUTH } from "./Actions.type";

const request = () => ({
    type: LOGIN_REQUEST,
    error: null
});

const requestComplete = (isAuthenticated) => ({
    type: LOGIN_REQUEST_COMPLETE,
    isAuthenticated: isAuthenticated
});

const requestError = (error) => ({
    type: LOGIN_REQUEST_ERROR,
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

export const login = (data) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['auth'])

        const response = await service.auth.login(data)

        if (response.status == 200) {
            localStorage.setItem("TOKEN", response.data.access_token)
            localStorage.setItem("PROVIDER", 'LOCAL')
            dispatch(setUser(response.data))
            dispatch(requestComplete(true))
        } else {
            const data = response.data
            dispatch(requestError(data))
        }
    }
};

export const loginSocialMedia = (token) => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['auth'])

        const response = await service.auth.login({}, token)

        if (response.status == 200) {
            localStorage.setItem("TOKEN", response.data.access_token)
            localStorage.setItem("PROVIDER", 'GOOGLE')
            dispatch(requestComplete(true))
        } else {
            const data = response.data
            dispatch(requestError(data))
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['auth'])

        await service.auth.logout()

        dispatch(requestComplete(false))
    }
};

export const cleanLoginAlert = () => ({
    type: LOGIN_CLEAN_ALERT,
    error: null
})

export const cleanLoginAuthentication = () => ({
    type: LOGIN_CLEAN_AUTH,
    isAuthenticated: false
})