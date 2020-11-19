import { API_PATH, HEALTH_CHECK_PATH } from './paths';
import PrivateService from './Private'

export default class ApiService extends PrivateService {
  async get() {
    try {
      return await this.httpService.get(`${API_PATH}/${HEALTH_CHECK_PATH}/`, {
        headers: {
          ['X-CSRFToken']: document.getElementsByName('csrfmiddlewaretoken')[0].value,
          Authorization: `Bearer ${this.getToken()}`
        }
      })
    } catch (error) {
      return error.response
    }
  }
}
