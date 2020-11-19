import { USER_REQUEST, USER_REQUEST_COMPLETE, USER_REQUEST_ERROR, USER_CLEAN_ALERT, USER_SET } from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    success: null,
    id: null,
    email: null,
    firstName: null,
    lastName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SET:
            return {
                ...state,
                id: action.id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
            }
        case USER_REQUEST_COMPLETE:
            return {
                ...state,
                success: action.success,
                loading: false
            }
        case USER_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case USER_CLEAN_ALERT:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}