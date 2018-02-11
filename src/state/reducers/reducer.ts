import {combineReducers} from 'redux';
import {challengesReducer as challenge} from "./challenges-reducer";
import {photosReducer as photo} from "./photos-reducer";
import {navigationReducer as navigation} from "./navigation-reducer";

const reducer:any = combineReducers({
    photo,challenge,navigation
});

export {reducer}