import { API_PATH, OBJECTIVE_PATH, GOAL_PATH } from './paths';
import PrivateService from './Private';

export default class GoalService extends PrivateService {
  async list(idObjective, page) {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/?page=${page}`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async get(idObjective, id) {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${id}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async create({ idObjective, goal, dateGoal }) {
    try {
      return await this.httpService.post(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/`, {
        goal: goal,
        dateGoal: dateGoal,
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async update({ id, idObjective, goal, dateGoal, description }) {
    try {
      return await this.httpService.put(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${id}/`, {
        goal: goal,
        dateGoal: dateGoal,
        description: description
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async done({ id, idObjective }) {
    try {
      return await this.httpService.patch(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${id}/`, null, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async remove(idObjective, id) {
    try {
      return await this.httpService.delete(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${id}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }
}