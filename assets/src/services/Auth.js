import { API_PATH, LOGIN_PATH, LOGOUT_PATH, SOCIAL_LOGIN_PATH } from './paths';
import PrivateService from './Private';

export default class AuthService extends PrivateService {
  async login(fields, token) {

    const body = token ? {
      client_id: "7ZiuVgYiggQKRcAzF3L8o6vl5y4pCRWrUefJgrwI",
      client_secret: "nZuKKi0ugRiEXFAahokRKLW0thKRRQtcRdMKCERTmXNUvj0WMsFiQ6ZFe6xMkyVLbRtP67qos9ImI3qnP1FkDvNEAawhJFS2L5HZiGaDwm4hmZJuwpHKjt6tBgTjRdq5",
      grant_type: "convert_token",
      backend: "google-oauth2",
      token: token
    } : {
        client_id: "7ZiuVgYiggQKRcAzF3L8o6vl5y4pCRWrUefJgrwI",
        client_secret: "nZuKKi0ugRiEXFAahokRKLW0thKRRQtcRdMKCERTmXNUvj0WMsFiQ6ZFe6xMkyVLbRtP67qos9ImI3qnP1FkDvNEAawhJFS2L5HZiGaDwm4hmZJuwpHKjt6tBgTjRdq5",
        grant_type: "password",
        username: fields.username,
        password: fields.password
      }

    try {
      return await this.httpService.post(`${API_PATH}/${token ? SOCIAL_LOGIN_PATH : LOGIN_PATH}/`, body, {
        headers: {
          ['X-CSRFToken']: document.getElementsByName('csrfmiddlewaretoken')[0].value,
        }
      })
    } catch (error) {
      return error.response
    }
  }

  async logout() {
    const body = {
      client_id: "7ZiuVgYiggQKRcAzF3L8o6vl5y4pCRWrUefJgrwI",
      client_secret: "nZuKKi0ugRiEXFAahokRKLW0thKRRQtcRdMKCERTmXNUvj0WMsFiQ6ZFe6xMkyVLbRtP67qos9ImI3qnP1FkDvNEAawhJFS2L5HZiGaDwm4hmZJuwpHKjt6tBgTjRdq5",
      token: this.getToken()
    }

    const response = await this.httpService.post(`${API_PATH}/${LOGOUT_PATH}/`, body,
      {
        headers: {
          ['X-CSRFToken']: document.getElementsByName('csrfmiddlewaretoken')[0].value,
          Authorization: `Bearer ${this.getToken()}`
        }
      })

    if (response.status === 204) {
      localStorage.removeItem("TOKEN")
      localStorage.removeItem("PROVIDER")
    }
  }
}
