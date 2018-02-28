/// <reference path="../actions/Actions.ts" />
import {Map, List, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const selectedWorkoutReducer = (state:AppStateModel['selectedWorkout'] = initialState.toJS(), action:ActionTypes) => {
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
        case ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_WEIGHT: {
            const lift = state.workout.lifts.filter(lift => lift.liftTypeKey === state.liftTypeKey)[0];
            if(!lift)
                return state;

            const liftIndex = state.workout.lifts.indexOf(lift);
            const workoutSet = lift.sets.filter(workoutSet => workoutSet.key === state.workoutSet.key)[0];

            if(!workoutSet)
                return state;

            const workoutSetIndex = lift.sets.indexOf(workoutSet);
            return fromJS(state).setIn(['workout','lifts',liftIndex,'sets',workoutSetIndex,'weight'],action.weight).set('editMode',null).toJS();
        }
        case ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_REPS: {
            const lift = state.workout.lifts.filter(lift => lift.liftTypeKey === state.liftTypeKey)[0];
            if(!lift)
                return state;

            const liftIndex = state.workout.lifts.indexOf(lift);
            const workoutSet = lift.sets.filter(workoutSet => workoutSet.key === state.workoutSet.key)[0];

            if(!workoutSet)
                return state;

            const workoutSetIndex = lift.sets.indexOf(workoutSet);
            return fromJS(state).setIn(['workout','lifts',liftIndex,'sets',workoutSetIndex,'reps'],action.reps).set('editMode',null).toJS();
        }
        case ActionTypeKeys.DELETE_SET: {
            const lift = state.workout.lifts.filter(lift => lift.liftTypeKey === action.liftTypeKey)[0];
            if(!lift)
                return state;

            const liftIndex = state.workout.lifts.indexOf(lift);
            const workoutSet = lift.sets.filter(workoutSet => workoutSet.key === action.key)[0];

            if(!workoutSet)
                return state;

            const workoutSetIndex = lift.sets.indexOf(workoutSet);
            return fromJS(state).updateIn(['workout','lifts',liftIndex,'sets'],(list:any) => list.splice(workoutSetIndex,1)).toJS();
        }
        case ActionTypeKeys.DELETE_LIFT: {
            const lift = state && state.workout && state.workout.lifts && state.workout.lifts.filter(lift => lift.liftTypeKey === action.liftTypeKey)[0];
            if(!lift)
                return state;

            const liftIndex = state.workout.lifts.indexOf(lift);
            return fromJS(state).updateIn(['workout','lifts'],(list:any) => list.splice(liftIndex,1)).toJS();
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