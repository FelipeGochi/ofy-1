import {
    OBJECTIVE_REQUEST,
    OBJECTIVE_REQUEST_COMPLETE,
    OBJECTIVE_REQUEST_ERROR,
    OBJECTIVE_CLEAN_ALERT,
    OBJECTIVE_SET,
    OBJECTIVE_LIST_SET
} from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    success: null,
    current: null,
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OBJECTIVE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OBJECTIVE_SET:
            return {
                ...state,
                current: action.objective,
                loading: false
            }
        case OBJECTIVE_LIST_SET:
            return {
                ...state,
                list: action.objectives,
                loading: false
            }
        case OBJECTIVE_REQUEST_COMPLETE:
            return {
                ...state,
                success: action.success,
                loading: false
            }
        case OBJECTIVE_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case OBJECTIVE_CLEAN_ALERT:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}