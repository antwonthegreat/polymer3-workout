export enum ActionTypeKeys {
    SELECT_PHOTO = 'SELECT_PHOTO',
    SUBMIT_PHOTO = 'SUBMIT_PHOTO',
    SELECT_CHALLENGE = 'SELECT_CHALLENGE',
    NAVIGATE = 'NAVIGATE',
    OTHER_ACTION = '__any_other_action_type__'
}

export type ActionTypes = SubmitPhotoAction|SelectPhotoAction|SelectChallengeAction|NavigateAction;

export interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
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