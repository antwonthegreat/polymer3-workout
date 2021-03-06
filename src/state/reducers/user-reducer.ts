/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({});

const userReducer = (state:any, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.SIGNED_IN: {
            return {uid:action.user.uid,displayName:action.user.displayName,photoURL:action.user.photoURL};
            // return {...state, selectedPhotoId:action.id};
        }
        default:
            return state || initialState.toJS();
    }
};

export {userReducer};