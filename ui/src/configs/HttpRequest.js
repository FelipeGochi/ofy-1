import ApiService from "../services/Api";
import AuthService from "../services/Auth";
import GoalService from "../services/Goal";
import ObjectiveService from "../services/Objective";
import TaskService from "../services/Task";
import UserService from "../services/User";

const WithHttpRequest = (services) => {
    const servicePool = {
        auth: new AuthService(),
        api: new ApiService(),
        goal: new GoalService(),
        objective: new ObjectiveService(),
        user: new UserService(),
        task: new TaskService()
    }

    return services.reduce((accumulator, currentValue) => {
        accumulator[currentValue] = servicePool[currentValue]
        return accumulator
    }, {})
}

export default WithHttpRequest