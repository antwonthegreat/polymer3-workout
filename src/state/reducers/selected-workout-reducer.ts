/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const selectedWorkoutReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.CLEAR_SELECTED_WORKOUT: { 
            return {};
        }
        case ActionTypeKeys.SELECTED_WORKOUT_RECEIVED: { 
            return {workout:action.workout};
        }
        case ActionTypeKeys.SELECT_WEIGHT: {
            return fromJS(state).set('editMode','weight').set('liftTypeKey',action.liftTypeKey).set('workoutSet',action.workoutSet).toJS();
        }
        case ActionTypeKeys.SELECT_REP: {
            return fromJS(state).set('editMode','rep').set('liftTypeKey',action.liftTypeKey).set('workoutSet',action.workoutSet).toJS();
        }
        default:
            return state || initialState.toJS();
    }
};

const selectedWorkoutSelector = (state:AppStateModel):Workout|null => {
    const workout = state.selectedWorkout ? state.selectedWorkout.workout : null;
    if(!workout)
        return null;

    const liftTypes = state.liftTypes;
    const augmentedLifts = workout.lifts ? workout.lifts.map(lift=>{
        const liftType = liftTypes[lift.liftTypeKey] || {};
        return Object.assign(
            {},
            lift,
            {name:  liftType.name},
            {repLabel:liftType.timed && liftType.timed.key ? 'time' : 'reps'},
            {weightLabel:liftType.timed && liftType.timed.key ? 'res.' : 'weight'},
            {liftType}
        );
    }) : [];
    return Object.assign({},workout,{lifts:augmentedLifts});
}

const selectedWorkoutSetSelector = (state:AppStateModel):WorkoutSet|null => {
    if(state.selectedWorkout && state.selectedWorkout.workoutSet)
        return state.selectedWorkout.workoutSet;

    return null;
}

export {selectedWorkoutReducer};
export {selectedWorkoutSelector};
export {selectedWorkoutSetSelector};