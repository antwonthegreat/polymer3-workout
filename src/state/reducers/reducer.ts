import {combineReducers} from 'redux';
import {userReducer as user} from "./user-reducer";
import {photosReducer as photo} from "./photos-reducer";
import {navigationReducer as navigation} from "./navigation-reducer";
import {workoutTypeReducer as workoutTypes} from "./workout-type-reducer";
import {liftTypeReducer as liftTypes} from "./lift-type-reducer";

const reducer:any = combineReducers({
    photo,navigation,user,workoutTypes,liftTypes
});

export {reducer}