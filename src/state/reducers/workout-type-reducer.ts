/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const workoutTypeReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.WORKOUT_TYPES_RECEIVED: { 
            Object.keys(action.workoutTypes).forEach((key)=>{
                action.workoutTypes[key].active = !!action.workoutTypes[key].users[action.user.uid];
            })
            return action.workoutTypes;
        }
        default:
            return state || initialState.toJS();
    }
};

export {workoutTypeReducer};