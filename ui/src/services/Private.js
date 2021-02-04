import axios from 'axios'

export default class PrivateService {
  constructor() {
    // TODO (adicionar apenas quando for para produção. Verificar como saber se estamos em produção.)
    if (process.env.NODE_ENV === 'production')
      axios.defaults.baseURL = 'https://objectivefy.com'

    this.httpService = axios;
  }

  isAuthenticated() { return this.getToken() !== null }

  getToken() {
    return localStorage.getItem("TOKEN")
  }

  getProvider() {
    return localStorage.getItem("PROVIDER")
  }

  getBackendAuth() {
    switch (this.getProvider()) {
      case 'GOOGLE':
        return 'GoogleOAuth2'
      default:
        return
    }
  }

  headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      }
    }
  }
}
