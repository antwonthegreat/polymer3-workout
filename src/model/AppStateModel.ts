import { User } from "../../node_modules/firebase/index"
import WorkoutSummary from "./WorkoutSummary";
import WorkoutType from "./WorkoutType";
import Workout from "./Workout";
import LiftType from "./LiftType";
import WorkoutSet from "./WorkoutSet";

export default interface AppStateModel {
    user:User;
    workoutSummaries:{[key:string]:WorkoutSummary};
    liftTypes:{[key:string]:LiftType};
    workoutTypes:{[key:string]:WorkoutType};
    selectedWorkout:{workout:Workout,workoutSet:WorkoutSet,editMode:string,liftTypeKey:string};
    navigation:{route:string};
}