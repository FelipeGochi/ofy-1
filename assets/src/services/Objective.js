import { API_PATH, OBJECTIVE_PATH } from './paths';
import PrivateService from './Private';

export default class ObjectiveService extends PrivateService {
  async list() {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async get(id) {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/${id}`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async create({ objective, dateObjective, dificulty }) {
    try {
      return await this.httpService.post(`${API_PATH}/${OBJECTIVE_PATH}/`, {
        objective: objective,
        dateObjective: dateObjective,
        dificulty: dificulty
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async update({ id, objective, dateObjective, dificulty }) {
    try {
      return await this.httpService.put(`${API_PATH}/${OBJECTIVE_PATH}/${id}/`, {
        objective: objective,
        dateObjective: dateObjective,
        dificulty: dificulty
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async done({ id }) {
    try {
      return await this.httpService.patch(`${API_PATH}/${OBJECTIVE_PATH}/${id}/`, null, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async remove(id) {
    try {
      return await this.httpService.delete(`${API_PATH}/${OBJECTIVE_PATH}/${id}`, this.headers())
    } catch (error) {
      return error.response
    }
  }
}
