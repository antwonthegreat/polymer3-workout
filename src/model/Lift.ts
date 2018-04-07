import WorkoutSet from "./WorkoutSet";
import LiftType from "./LiftType";

export default interface Lift {
    liftTypeKey:string
    sets:Array<WorkoutSet>;

    //computed
    name?:string;
    liftType?:LiftType;
    weightLabel?:string;
    repLabel?:string;
}