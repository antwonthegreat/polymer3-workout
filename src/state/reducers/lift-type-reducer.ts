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
        case ActionTypeKeys.WORKOUT_SUMMARIES_RECEIVED: {
            return updateCompletedDates(state,action.workoutSummaries,action.workoutTypes,'','');
        }
        case ActionTypeKeys.DELETE_LIFT: {
            return updateCompletedDates(state,action.workoutSummaries,action.workoutTypes,action.selectedWorkoutKey,action.liftTypeKey);
        }
        default:
            return state || initialState.toJS();
    }
};

const updateCompletedDates = (state:any,workoutSummaries:{[key:string]:WorkoutSummary},workoutTypes:{[key:string]:WorkoutType},workoutKey:string,deletedLiftTypeKey:string) => {
    let newState = fromJS(state);
    if(workoutSummaries){
        if(deletedLiftTypeKey){
            newState = newState.setIn([deletedLiftTypeKey,'lastCompletedDate'],0);
        }

        //Set each liftType's lastCompleted date
        Object.keys(workoutSummaries).forEach(key=>{
            const workoutSummary = workoutSummaries[key];
            if(workoutSummary.liftTypeKeys){
                workoutSummary.liftTypeKeys.forEach(liftTypeKey => {
                    if(workoutSummary.id !== workoutKey || liftTypeKey !== deletedLiftTypeKey ){
                        newState = newState.updateIn([liftTypeKey,'lastCompletedDate'],(lastCompletedDate:number) => {
                            return Math.max(lastCompletedDate||0,workoutSummary.startDate||0) 
                        });
                    }
                });
            }
        });

        //Set each liftType's completed
        const liftTypes = newState.toJS();
        Object.keys(liftTypes).forEach(liftTypeKey=>{
            const liftType = liftTypes[liftTypeKey];
            const workoutType = workoutTypes ? workoutTypes[liftType.workoutTypeKey] : null;
            let completed = false;
            if(liftType.workoutTypeKey === 'wta'){
                console.log('!!!!',liftType, workoutType);
            }
            if(!liftType.lastCompletedDate){
                completed = false;
            } else if(!workoutType || !workoutType.lastCompletedDate){
                completed = true;
            }else{
                completed = liftType.lastCompletedDate >= workoutType.lastCompletedDate;
            }
            newState = newState.setIn([liftTypeKey,'completed'],completed);
        });
    }
    return newState.toJS();
}

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