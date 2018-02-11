import {Map, fromJS} from 'immutable';
import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const navigationReducer = (state:any = initialState, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.NAVIGATE: {
            return fromJS(state).set('route',action.route).toJS();
            // return {...state, route:action.route};
        }
        case ActionTypeKeys.SELECT_CHALLENGE: {
            return fromJS(state).set('route',`/challenge/${action.id}/`).toJS();
            //return {...state, route:`/challenge/${action.id}/`};
        }
        case ActionTypeKeys.SUBMIT_PHOTO: {
            return fromJS(state).set('route','/challenges/').toJS();
            //return {...state, route:`/challenges/`};
        }
        default:
            return initialState.toJS();
    }
};

export {navigationReducer};