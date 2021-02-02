import Axios from "axios";

export default class PublicService {
    constructor() {
        // TODO (adicionar apenas quando for para produção. Verificar como saber se estamos em produção.)
        if (process.env.NODE_ENV === 'production')
            Axios.defaults.baseURL = 'http://objectivefy.com'
        else
            Axios.defaults.baseURL = 'http://127.0.0.1:8000'

        this.httpService = Axios;
    }
}