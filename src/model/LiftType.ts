import { User } from "../../node_modules/firebase/index"

export default interface LiftType {
    users:{[key:string]:Partial<User>};
    name:string;
    timed:{key:string};
    workoutTypeKey:string;

    //computed
    active:boolean;
    lastCompletedDate?:number;
    completed?:boolean;
}