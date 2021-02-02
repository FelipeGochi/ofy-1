import Axios from "axios";

export default class PublicService {
    constructor() {
        // TODO (adicionar apenas quando for para produção. Verificar como saber se estamos em produção.)
        Axios.defaults.baseURL = 'http://objectivefy.com'
        this.httpService = Axios;
    }
}