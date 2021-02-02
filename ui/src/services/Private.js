import axios from 'axios'

export default class PrivateService {
  constructor() {
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
        Authorization: `Bearer ${this.getToken()}`
      }
    }
  }
}
