import { REQUEST, REQUEST_COMPLETE, REQUEST_ERROR } from "../actions/Actions.type"

const initialState = {
    loading: false,
    isHealth: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loading: true
            }
        case REQUEST_COMPLETE:
            return {
                ...state,
                isHealth: true,
                loading: false
            }
        case REQUEST_ERROR:
            return {
                ...state,
                isHealth: false,
                loading: false
            }
        default:
            return state
    }
}