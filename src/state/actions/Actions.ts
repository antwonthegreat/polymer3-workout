/// <reference path="../../model/WorkoutType.ts" />
/// <reference path="../../model/LiftType.ts" />
/// <reference path="../../model/AppStateModel.ts" />
/// <reference path="../../../node_modules/firebase/index.d.ts" />

import {FirebaseService} from "../../services/FirebaseService";

export enum ActionTypeKeys {
    SELECT_PHOTO = 'SELECT_PHOTO',
    SUBMIT_PHOTO = 'SUBMIT_PHOTO',
    SELECT_CHALLENGE = 'SELECT_CHALLENGE',
    NAVIGATE = 'NAVIGATE',
    WORKOUT_TYPES_RECEIVED = 'WORKOUT_TYPES_RECEIVED',
    LIFT_TYPES_RECEIVED = 'LIFT_TYPES_RECEIVED',

    SIGNED_IN = 'SIGNED_IN',
    OTHER_ACTION = '__any_other_action_type__'
}

export type ActionTypes = SubmitPhotoAction|SelectPhotoAction|SelectChallengeAction|NavigateAction|SignedInAction|workoutTypesReceivedAction|liftTypesReceivedAction;

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
    user:firebase.User
}

export function getWorkoutTypesAsync(){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        let workoutTypes;
        try{
            workoutTypes = await f.getAsync('/workout-types');
        }catch(error){
            console.log('error:',error);
        }
        dispatch(workoutTypesReceived(workoutTypes,state().user));
    }
}

function workoutTypesReceived(workoutTypes:{[key:string]:WorkoutType},user:firebase.User):workoutTypesReceivedAction {
    return {
        type:ActionTypeKeys.WORKOUT_TYPES_RECEIVED,
        workoutTypes,
        user
    }
}

export interface liftTypesReceivedAction {
    type:ActionTypeKeys.LIFT_TYPES_RECEIVED;
    liftTypes:{[key:string]:LiftType},
    user:firebase.User
}

export function getLiftTypesAsync(){
    return async (dispatch:any,state:()=>AppStateModel) => {
        const f = new FirebaseService();
        let liftTypes;
        try{
            liftTypes = await f.getAsync('/lift-types');
        }catch(error){
            console.log('error:',error);
        }
        dispatch(liftTypesReceived(liftTypes,state().user));
    }
}

function liftTypesReceived(liftTypes:{[key:string]:LiftType},user:firebase.User):liftTypesReceivedAction {
    return {
        type:ActionTypeKeys.LIFT_TYPES_RECEIVED,
        liftTypes,
        user
    }
}


export interface SelectPhotoAction {
    type:ActionTypeKeys.SELECT_PHOTO;
    id:string
}

export function selectPhoto(id:string):SelectPhotoAction {
    return {
        type:ActionTypeKeys.SELECT_PHOTO,
        id
    }
}

export interface SubmitPhotoAction {
    type:ActionTypeKeys.SUBMIT_PHOTO;
    id:string,
    challengeId:string,
    path:string
}

export function submitPhoto(id:string,challengeId:string,path:string):SubmitPhotoAction {
    return {
        type:ActionTypeKeys.SUBMIT_PHOTO,
        id,
        challengeId,
        path
    }
}

export interface SelectChallengeAction {
    type:ActionTypeKeys.SELECT_CHALLENGE;
    id:string
}

export function selectChallenge(id:string):SelectChallengeAction {
    return {
        type:ActionTypeKeys.SELECT_CHALLENGE,
        id
    }
}

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