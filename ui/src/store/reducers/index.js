import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ObjectiveReducer from './ObjectiveReducer'
import UserReducer from './UserReducer';
import { reducer as formReducer } from 'redux-form'
import ApiReducer from './ApiReducer';
import GoalReducer from './GoalReducer';
import TaskReducer from './TaskReducer';

export const Reducers = combineReducers({
    auth: AuthReducer,
    api: ApiReducer,
    goal: GoalReducer,
    objective: ObjectiveReducer,
    user: UserReducer,
    form: formReducer,
    task: TaskReducer,
});