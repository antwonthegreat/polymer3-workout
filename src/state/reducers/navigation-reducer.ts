import {Map, fromJS} from 'immutable';
import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const navigationReducer = (state:any = initialState, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.NAVIGATE: {
            return fromJS(state).set('route',action.route).toJS();
            // return {...state, route:action.route};
        }
        default:
            return state || initialState.toJS();
    }
};

export {navigationReducer};