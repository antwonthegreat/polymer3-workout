/// <reference path="../actions/Actions.ts" />
import {Map, fromJS} from 'immutable';

import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({
    photos: Map({})
});

const photosReducer = (state:any = initialState, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.SELECT_PHOTO: {
            return fromJS(state).set('selectedPhotoId',action.id).toJS();
            // return {...state, selectedPhotoId:action.id};
        }
        case ActionTypeKeys.SUBMIT_PHOTO : {
            return fromJS(state)
            .setIn(['photos',[action.id],'challengeId'],action.challengeId)
            .setIn(['photos',[action.id],'path'],action.path)
            .toJS();
            
            // return {...state, photos:{
            //     ...state.photos,
            //     [action.id]:{
            //         challengeId:action.challengeId,
            //         path:action.path
            //     }
            // }};
        }
        default:
            return initialState.toJS();
    }
};

export {photosReducer};