interface WorkoutType {
    users:{[key:string]:Partial<firebase.User>};

    //computed
    active:boolean;
}