/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const workoutSummaryReducer = (state:AppStateModel['workoutSummaries'] = initialState.toJS(), action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.WORKOUT_SUMMARIES_RECEIVED: {
            return action.workoutSummaries;
        }
        case ActionTypeKeys.DELETE_LIFT: {
            if(!action.selectedWorkoutKey)
                return state;

            const liftTypeKey = state[action.selectedWorkoutKey] && state[action.selectedWorkoutKey].liftTypeKeys.filter(liftTypeKey => liftTypeKey === action.liftTypeKey)[0];
            if(!liftTypeKey)
                return state;

            const liftTypeKeyIndex = state[action.selectedWorkoutKey].liftTypeKeys.indexOf(liftTypeKey);

            return fromJS(state).updateIn([action.selectedWorkoutKey,'liftTypeKeys'],(list:any) => list.splice(liftTypeKeyIndex,1)).toJS();
        }
        case ActionTypeKeys.ADD_LIFT: {
            if(!action.selectedWorkoutKey)
                return state;

            const liftTypeKey = state[action.selectedWorkoutKey] && state[action.selectedWorkoutKey].liftTypeKeys.filter(liftTypeKey => liftTypeKey === action.lift.liftTypeKey)[0];
            if (liftTypeKey || !state[action.selectedWorkoutKey] || !state[action.selectedWorkoutKey].liftTypeKeys)
                return state;

            return fromJS(state).updateIn([action.selectedWorkoutKey,'liftTypeKeys'],(list:any) => list.push(action.lift.liftTypeKey)).toJS();
        }    
        default:
            return state || initialState.toJS();
    }
};


const workoutSummaryWithLiftNamesSelector = (state:AppStateModel) => {
    return Object.keys(state.workoutSummaries).map((key)=>{
        const workoutSummary = state.workoutSummaries[key];
        const liftTypeNames = workoutSummary.liftTypeKeys ? workoutSummary.liftTypeKeys.map((liftTypeKey)=>{
            return state.liftTypes[liftTypeKey].name || '';
        }) : '';
        return Object.assign({},workoutSummary,{liftTypeNames,id:key});
    }).sort((a,b)=>{
        return b.startDate - a.startDate; 
    });
}

export {workoutSummaryReducer};
export {workoutSummaryWithLiftNamesSelector};