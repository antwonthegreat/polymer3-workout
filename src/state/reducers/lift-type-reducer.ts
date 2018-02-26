/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const liftTypeReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.LIFT_TYPES_RECEIVED: {
            Object.keys(action.liftTypes).forEach((key)=>{
                action.liftTypes[key].active = !!action.user.uid && !!action.liftTypes[key].users[action.user.uid];
            })
            return action.liftTypes;
        }
        default:
            return state || initialState.toJS();
    }
};

export {liftTypeReducer};