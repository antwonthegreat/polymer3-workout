export default interface WorkoutType {
    users?:{[key:string]:{startDate?:number}};

    //computed
    active?:boolean;
    lastCompletedDate?:number;
}