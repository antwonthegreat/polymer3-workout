/// <reference path="../../model/WorkoutType.ts" />
/// <reference path="../../model/LiftType.ts" />
/// <reference path="../../model/WorkoutSummary.ts" />
/// <reference path="../../model/Workout.ts" />
/// <reference path="../../model/AppStateModel.ts" />
/// <reference path="../../../node_modules/firebase/index.d.ts" />

import {FirebaseService} from "../../services/FirebaseService";

export enum ActionTypeKeys {
    NAVIGATE = 'NAVIGATE',
    WORKOUT_TYPES_RECEIVED = 'WORKOUT_TYPES_RECEIVED',
    LIFT_TYPES_RECEIVED = 'LIFT_TYPES_RECEIVED',
    WORKOUT_SUMMARIES_RECEIVED = 'WORKOUT_SUMMARIES_RECEIVED',
    SELECTED_WORKOUT_RECEIVED = 'SELECTED_WORKOUT_RECEIVED',
    CLEAR_SELECTED_WORKOUT = 'CLEAR_SELECTED_WORKOUT',
    SELECT_REP = 'SELECT_REP',
    SELECT_WEIGHT = 'SELECT_WEIGHT',
    SET_DELETED = 'SET_DELETED',
    LIFT_DELETED = 'LIFT_DELETED',
    SELECTED_WORKOUT_UPDATED = 'SELECTED_WORKOUT_UPDATED',
    UPDATE_SELECTED_WORKOUTSET_WEIGHT = 'UPDATE_SELECTED_WORKOUTSET_WEIGHT',
    UPDATE_SELECTED_WORKOUTSET_REPS = 'UPDATE_SELECTED_WORKOUTSET_REPS',
    DELETE_SET = 'DELETE_SET',
    DELETE_LIFT = 'DELETE_LIFT',

    SIGNED_IN = 'SIGNED_IN',
    OTHER_ACTION = '__any_other_action_type__'
}

export interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

export interface SignedInAction {
    type:ActionTypeKeys.SIGNED_IN;
    user:any;
}

export function signInIfNeeded() {
    return async (dispatch:any) => {
        const f = new FirebaseService();
        try{
            let user = await f.signInIfNeeded();
            dispatch(signedIn(user));
        }catch(error){
            console.log('error:',error);
        }
    }
}

function signedIn(user:any):SignedInAction {
    return {
        type:ActionTypeKeys.SIGNED_IN,
        user
    }
}

export interface workoutTypesReceivedAction {
    type:ActionTypeKeys.WORKOUT_TYPES_RECEIVED;
    workoutTypes:{[key:string]:WorkoutType},
    user:Partial<firebase.User>
}

export function getWorkoutTypesAsync(){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        let workoutTypes;
        try{
            workoutTypes = await f.getAsync<WorkoutType>('/workout-types');
        }catch(error){
            console.log('error:',error);
        }
        if(workoutTypes)
            dispatch(workoutTypesReceived(workoutTypes,state().user));
    }
}

export function workoutTypesReceived(workoutTypes:{[key:string]:WorkoutType},user:Partial<firebase.User>):workoutTypesReceivedAction {
    return {
        type:ActionTypeKeys.WORKOUT_TYPES_RECEIVED,
        workoutTypes,
        user
    }
}

export interface liftTypesReceivedAction {
    type:ActionTypeKeys.LIFT_TYPES_RECEIVED;
    liftTypes:{[key:string]:LiftType},
    user:Partial<firebase.User>
}

export function getLiftTypesAsync(){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        let liftTypes;
        try{
            liftTypes = await f.getAsync<LiftType>('/lift-types');
        }catch(error){
            console.log('error:',error);
        }
        if(liftTypes)
            dispatch(liftTypesReceived(liftTypes,state().user));
    }
}

export function liftTypesReceived(liftTypes:{[key:string]:LiftType},user:Partial<firebase.User>):liftTypesReceivedAction {
    return {
        type:ActionTypeKeys.LIFT_TYPES_RECEIVED,
        liftTypes,
        user
    }
}

export interface workoutSummariesReceivedAction {
    type:ActionTypeKeys.WORKOUT_SUMMARIES_RECEIVED;
    workoutSummaries:{[key:string]:WorkoutSummary}
}

export function getWorkoutSummariesAsync(){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        let items;
        try{
            let uid = state().user.uid;
            items = await f.getAsync<WorkoutSummary>(`/users/${uid}/workout-summaries/`,undefined,'orderStartDate');
        }catch(error){
            console.log('error:',error);
        }
        if(items)
            dispatch(workoutSummariesReceived(items));
    }
}

export function workoutSummariesReceived(workoutSummaries:{[key:string]:WorkoutSummary}):workoutSummariesReceivedAction {
    return {
        type:ActionTypeKeys.WORKOUT_SUMMARIES_RECEIVED,
        workoutSummaries
    }
}

export interface ClearSelectedWorkoutAction {
    type:ActionTypeKeys.CLEAR_SELECTED_WORKOUT
}

export function selectedWorkoutCleared():ClearSelectedWorkoutAction {
    return {
        type:ActionTypeKeys.CLEAR_SELECTED_WORKOUT
    }
}

export interface WorkoutReceivedAction {
    type:ActionTypeKeys.SELECTED_WORKOUT_RECEIVED;
    workout:Workout;
}


export function selectedWorkoutReceived(workout:Workout):WorkoutReceivedAction {
    if(workout.lifts){
        workout.lifts.forEach(lift=>{
            if(lift.sets){
                lift.sets.forEach(set=>{
                    if(!set.key)
                        set.key = generatePushID();
                });
            };
        });
    }
    return {
        type:ActionTypeKeys.SELECTED_WORKOUT_RECEIVED,
        workout
    }
}

export function selectWorkoutAsync(id:string){
    return async (dispatch:any,state:()=>AppStateModel) => {
        dispatch(selectedWorkoutCleared());
        const f = new FirebaseService();
        let workout;
        try{
            let uid = state().user.uid;
            workout = (await f.getAsync<Workout>(`/users/${uid}/workouts/`,id))[id];
        }catch(error){
            console.log('error:',error);
        }
        if(workout !== undefined)
            dispatch(selectedWorkoutReceived(workout as Workout));
    }
}

export interface SelectWeightAction {
    type:ActionTypeKeys.SELECT_WEIGHT;
    workoutSet:WorkoutSet;
    liftTypeKey:string;
}


export function selectWeight(workoutSet:WorkoutSet,liftTypeKey:string):SelectWeightAction {
    return {
        type:ActionTypeKeys.SELECT_WEIGHT,
        workoutSet,
        liftTypeKey
    }
}

export interface SelectRepAction {
    type:ActionTypeKeys.SELECT_REP;
    workoutSet:WorkoutSet;
    liftTypeKey:string;
}


export function selectRep(workoutSet:WorkoutSet,liftTypeKey:string):SelectRepAction {
    return {
        type:ActionTypeKeys.SELECT_REP,
        workoutSet,
        liftTypeKey
    }
}

export interface SelectedWorkoutUpdatedAction {
    type:ActionTypeKeys.SELECTED_WORKOUT_UPDATED
}

export function selectedWorkoutUpdated():SelectedWorkoutUpdatedAction {
    return {
        type:ActionTypeKeys.SELECTED_WORKOUT_UPDATED
    }
}

export interface updateSelectedWorkoutSetWeightAction {
    type:ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_WEIGHT,
    weight:number;
}

export function updateSelectedWorkoutSetWeight(weight:number): updateSelectedWorkoutSetWeightAction {
    return {
        type:ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_WEIGHT,
        weight
    }
}

export function updateSelectedWorkoutSetWeightAsync(weight:number){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        dispatch(updateSelectedWorkoutSetWeight(weight));
        try{
            let uid = state().user.uid;
            const g = await f.patchAsync(`/users/${uid}/workouts`,state().selectedWorkout.workout.key,state().selectedWorkout.workout);
        }catch(error){
            console.log('error:',error);
        }
        dispatch(selectedWorkoutUpdated());
    }
}

export interface updateSelectedWorkoutSetRepsAction {
    type:ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_REPS,
    reps:number;
}

export function updateSelectedWorkoutSetReps(reps:number): updateSelectedWorkoutSetRepsAction {
    return {
        type:ActionTypeKeys.UPDATE_SELECTED_WORKOUTSET_REPS,
        reps
    }
}

export function updateSelectedWorkoutSetRepsAsync(reps:number){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        dispatch(updateSelectedWorkoutSetReps(reps));
        try{
            let uid = state().user.uid;
            const g = await f.patchAsync(`/users/${uid}/workouts`,state().selectedWorkout.workout.key,state().selectedWorkout.workout);
        }catch(error){
            console.log('error:',error);
        }
        dispatch(selectedWorkoutUpdated());
    }
}

export interface deleteSetAction {
    type:ActionTypeKeys.DELETE_SET,
    key:string;
    liftTypeKey:string;
}

export function deleteSet(key:string,liftTypeKey:string): deleteSetAction {
    return {
        type:ActionTypeKeys.DELETE_SET,
        key,
        liftTypeKey
    }
}

export function deleteSetAsync(key:string,liftTypeKey:string){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        dispatch(deleteSet(key,liftTypeKey));
        try{
            let uid = state().user.uid;
            const g = await f.patchAsync(`/users/${uid}/workouts`,state().selectedWorkout.workout.key,state().selectedWorkout.workout);
        }catch(error){
            console.log('error:',error);
        }
        dispatch(selectedWorkoutUpdated());
    }
}

export interface deleteLiftAction {
    type:ActionTypeKeys.DELETE_LIFT;
    liftTypeKey:string;
    selectedWorkoutKey:string;
}

export function deleteLift(liftTypeKey:string,selectedWorkoutKey:string): deleteLiftAction {
    return {
        type:ActionTypeKeys.DELETE_LIFT,
        liftTypeKey,
        selectedWorkoutKey
    }
}

export function deleteLiftAsync(liftTypeKey:string){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        const selectedWorkoutKey = state().selectedWorkout.workout.key;
        dispatch(deleteLift(liftTypeKey,selectedWorkoutKey));
        try{
            let uid = state().user.uid;
            const g = await f.patchAsync(`/users/${uid}/workouts`,state().selectedWorkout.workout.key,state().selectedWorkout.workout);
        }catch(error){
            console.log('error:',error);
        }
        dispatch(selectedWorkoutUpdated());
    }
}

export type ActionTypes = NavigateAction|SignedInAction|workoutTypesReceivedAction|liftTypesReceivedAction|workoutSummariesReceivedAction|WorkoutReceivedAction|ClearSelectedWorkoutAction|SelectWeightAction|SelectRepAction|SelectedWorkoutUpdatedAction|updateSelectedWorkoutSetWeightAction|updateSelectedWorkoutSetRepsAction|deleteSetAction|deleteLiftAction;

export interface NavigateAction {
    type:ActionTypeKeys.NAVIGATE;
    route:string
}

export function navigate(route:string):NavigateAction {
    return {
        type:ActionTypeKeys.NAVIGATE,
        route
    }
}

function generatePushID () {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars:Array<number> = [];
  
    var now = new Date().getTime();
    var duplicateTime = (now === lastPushTime);
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
    now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');

    var id = timeStampChars.join('');

    if (!duplicateTime) {
    for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
    }
    } else {
    // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
    for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
    }
    lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
    id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if(id.length != 20) throw new Error('Length should be 20.');

    return id;
  };