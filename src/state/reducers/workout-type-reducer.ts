/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const workoutTypeReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.WORKOUT_TYPES_RECEIVED: { 
            Object.keys(action.workoutTypes).forEach((key)=>{
                const usersObject = action.user.uid && action.workoutTypes[key].users;
                if(usersObject && action.user.uid){
                    action.workoutTypes[key].active = !!usersObject[action.user.uid];
                    action.workoutTypes[key].lastCompletedDate = !!usersObject[action.user.uid] ? usersObject[action.user.uid].startDate : 0 || 0;
                }
            })
            return action.workoutTypes;
        }
        default:
            return state || initialState.toJS();
    }
};

const workoutTypeSelector = (state:AppStateModel):Array<WorkoutType> => {
    if(!state.workoutTypes)
        return [];

    return Object.keys(state.workoutTypes).map(key => {
        return Object.assign({},state.workoutTypes[key],{key});
    });
}

export {workoutTypeReducer};
export {workoutTypeSelector};