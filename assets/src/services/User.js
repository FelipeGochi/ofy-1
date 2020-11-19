import { API_PATH, USER_PATH, PASSWORD_RECOVERY_PATH, VERIFY } from './paths';
import PrivateService from './Private';

export default class UserService extends PrivateService {
  async get() {
    try {
      return await this.httpService.get(`${API_PATH}/${USER_PATH}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async create({ name, lastName, username, password, confirmationPassword }) {
    try {
      return await this.httpService.post(`${API_PATH}/${USER_PATH}/`, {
        name: name,
        lastName: lastName,
        username: username,
        password: password,
        confirmationPassword: confirmationPassword
      })
    } catch (error) {
      return error.response
    }
  }

  async update({ id, firstName, lastName }) {
    try {
      return await this.httpService.put(`${API_PATH}/${USER_PATH}/${id}/`, {
        firstName: firstName,
        lastName: lastName,
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }


  async recovery({ password, token }) {
    try {
      return await this.httpService.put(`${API_PATH}/${USER_PATH}/${PASSWORD_RECOVERY_PATH}/`, {
        password: password,
        token: token
      })
    } catch (error) {
      return error.response
    }
  }

  async passwordRecovery(email) {
    try {
      return await this.httpService.post(`${API_PATH}/${USER_PATH}/${PASSWORD_RECOVERY_PATH}/`, {
        email: email
      })
    } catch (error) {
      return error.response
    }
  }

  async verify(token) {
    try {
      return await this.httpService.put(`${API_PATH}/${USER_PATH}/${VERIFY}/`, {
        token: token
      })
    } catch (error) {
      return error.response
    }
  }
}
