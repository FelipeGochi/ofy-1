import {
    TASK_REQUEST,
    TASK_REQUEST_COMPLETE,
    TASK_REQUEST_ERROR,
    TASK_CLEAN_ALERT,
    TASK_SET,
    TASK_LIST_SET
} from "../actions/Actions.type"

const initialState = {
    loading: false,
    error: null,
    success: null,
    current: null,
    list: [],
    currentList: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TASK_SET:
            return {
                ...state,
                current: action.task,
                loading: false
            }
        case TASK_LIST_SET:
            return {
                ...state,
                list: action.tasks,
                currentList: action.currentList,
                loading: false
            }
        case TASK_REQUEST_COMPLETE:
            return {
                ...state,
                success: action.success,
                loading: false
            }
        case TASK_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case TASK_CLEAN_ALERT:
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export default taskReducer