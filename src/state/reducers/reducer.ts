import {combineReducers} from 'redux';
import {userReducer as user} from "./user-reducer";
import {navigationReducer as navigation} from "./navigation-reducer";
import {workoutTypeReducer as workoutTypes} from "./workout-type-reducer";
import {liftTypeReducer as liftTypes} from "./lift-type-reducer";
import {workoutSummaryReducer as workoutSummaries} from "./workout-summary-reducer";
import {selectedWorkoutReducer as selectedWorkout} from "./selected-workout-reducer";

const reducer:any = combineReducers({
    navigation,user,workoutTypes,liftTypes,workoutSummaries,selectedWorkout
});

export {reducer}