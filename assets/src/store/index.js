import { connect } from 'react-redux';
import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Reducers } from './reducers';

export const Store = createStore(Reducers, applyMiddleware(thunk));

export const WithStore = (Component, states, [actions] = []) => {
    const mapStateToProps = store => (Object.assign(
        ...states.map(state => (
            {
                [state]: store[state]
            }
        ))))

    const mapDispatchToProps = dispatch =>
        bindActionCreators({ ...actions }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(Component)
}