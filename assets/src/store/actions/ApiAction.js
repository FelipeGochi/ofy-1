import WithHttpRequest from "../../configs/HttpRequest";
import { REQUEST, REQUEST_COMPLETE, REQUEST_ERROR } from "./Actions.type";

const request = () => ({
    type: REQUEST,
});

const requestComplete = () => ({
    type: REQUEST_COMPLETE,
});

const requestError = (error) => ({
    type: REQUEST_ERROR,
    error: {
        code: error.code,
        message: error.detail,
        severity: error.severity,
        title: error.title
    },
});

export const get = () => {
    return async (dispatch) => {
        dispatch(request())

        const service = WithHttpRequest(['api'])

        const response = await service.api.get()

        if (response.status == 200) {
            dispatch(requestComplete())
        } else {
            const data = response.data
            dispatch(requestError(data))
        }
    }
};