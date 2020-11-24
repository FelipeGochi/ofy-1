import {
    GOAL_REQUEST,
    GOAL_REQUEST_COMPLETE,
    GOAL_REQUEST_ERROR,
    GOAL_CLEAN_ALERT,
    GOAL_SET,
    GOAL_LIST_SET
} from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    success: null,
    current: null,
    page: 1,
    total: 0,
    list: [],
    currentList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GOAL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GOAL_SET:
            return {
                ...state,
                current: action.goal,
                loading: false
            }
        case GOAL_LIST_SET:
            return {
                ...state,
                list: action.goals,
                currentList: action.currentList,
                page: action.next,
                total: action.total,
                loading: false,
            }
        case GOAL_REQUEST_COMPLETE:
            return {
                ...state,
                success: action.success,
                loading: false
            }
        case GOAL_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case GOAL_CLEAN_ALERT:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}