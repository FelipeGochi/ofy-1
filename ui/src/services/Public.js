import Axios from "axios";

export default class PublicService {
    constructor() {
        // TODO (adicionar apenas quando for para produção. Verificar como saber se estamos em produção.)
        if (process.env.NODE_ENV === 'production')
            Axios.defaults.baseURL = 'https://objectivefy.com'

        this.httpService = Axios;
    }
}