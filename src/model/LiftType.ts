interface LiftType {
    users:{[key:string]:Partial<firebase.User>};
    name:string;
    timed:{key:string};
    workoutTypeKey:string;

    //computed
    active:boolean;
}