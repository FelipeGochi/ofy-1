import {
    OBJECTIVE_REQUEST,
    OBJECTIVE_REQUEST_COMPLETE,
    OBJECTIVE_REQUEST_ERROR,
    OBJECTIVE_CLEAN_ALERT,
    OBJECTIVE_SET,
    OBJECTIVE_LIST_SET,
    OBJECTIVE_SET_PAGE
} from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    success: null,
    current: null,
    page: 1,
    total: 0,
    list: []
}

const objectiveReducer = (state = initialState, action) => {
    switch (action.type) {
        case OBJECTIVE_REQUEST:
            return {
                ...state,
                action: false,
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
                page: action.next,
                total: action.total,
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
        case OBJECTIVE_SET_PAGE:
            return {
                ...state,
                page: action.page,
            }
        default:
            return state
    }
}

export default objectiveReducer