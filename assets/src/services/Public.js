import Axios from "axios";

export default class PublicService {
    constructor() {
        this.httpService = Axios;
    }
}