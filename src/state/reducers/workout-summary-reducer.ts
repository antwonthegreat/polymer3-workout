/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const workoutSummaryReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.WORKOUT_SUMMARIES_RECEIVED: { 
            return action.workoutSummaries;
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