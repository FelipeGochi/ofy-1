import Axios from "axios";

export default class PublicService {
    constructor() {
        Axios.defaults.baseURL = 'http://objectivefy.com'
        this.httpService = Axios;
    }
}