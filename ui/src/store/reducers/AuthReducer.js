import { LOGIN_REQUEST, LOGIN_REQUEST_COMPLETE, LOGIN_REQUEST_ERROR, LOGIN_CLEAN_ALERT, LOGIN_CLEAN_AUTH } from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem("TOKEN"),
    isGoogleAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_REQUEST_COMPLETE:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                loading: false
            }
        case LOGIN_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                isAuthenticated: false,
                loading: false
            }
        case LOGIN_CLEAN_ALERT:
            return {
                ...state,
                ...action
            }
        case LOGIN_CLEAN_AUTH:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export default authReducer