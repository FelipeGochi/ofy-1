import { API_PATH, OBJECTIVE_PATH, GOAL_PATH, TASK_PATH } from './paths';
import PrivateService from './Private';

export default class TaskService extends PrivateService {
  async list(idObjective, idGoal) {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async get(idObjective, idGoal, id) {
    try {
      return await this.httpService.get(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/${id}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async create({ idObjective, idGoal, task, description }) {
    try {
      return await this.httpService.post(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/`, {
        task: task,
        description: description
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async update({ id, idObjective, idGoal, task, description }) {
    try {
      return await this.httpService.put(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/${id}/`, {
        task: task,
        description: description
      }, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async done({ id, idObjective, idGoal }) {
    try {
      return await this.httpService.patch(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/${id}/`, null, this.headers())
    } catch (error) {
      return error.response
    }
  }

  async remove(idObjective, idGoal, id) {
    try {
      return await this.httpService.delete(`${API_PATH}/${OBJECTIVE_PATH}/${idObjective}/${GOAL_PATH}/${idGoal}/${TASK_PATH}/${id}/`, this.headers())
    } catch (error) {
      return error.response
    }
  }
}