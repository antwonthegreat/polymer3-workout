/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const liftTypeReducer = (state:any = initialState, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.LIFT_TYPES_RECEIVED: {
            Object.keys(action.liftTypes).forEach((key)=>{
                action.liftTypes[key].active = !!action.user.uid && !!action.liftTypes[key].users[action.user.uid];
            })
            return action.liftTypes;
        }
        case ActionTypeKeys.UPDATE_LIFT_TYPES: {
            return action.liftTypes || initialState.toJS();
        }
        default:
            return state || initialState.toJS();
    }
};

const activeLiftTypeSelector = (state:AppStateModel, workoutTypeKey:string):Array<LiftType> => {
    if(!state.liftTypes)
        return [];

    return Object.keys(state.liftTypes).filter(key => {
        return state.liftTypes[key] && state.liftTypes[key].active && state.liftTypes[key].workoutTypeKey === workoutTypeKey;
    }).map(key => {
        return state.liftTypes[key];
    }).sort((a,b)=>{
        return a.name as any - (b.name as any);
    });
}

export {liftTypeReducer};
export {activeLiftTypeSelector};