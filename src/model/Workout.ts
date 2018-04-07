import Lift from "./Lift";

export default interface Workout {
    key:string;
    lifts:Array<Lift>;
    name:string;
    orderStartDate:number;
    startDate:number;
    id:string;
}