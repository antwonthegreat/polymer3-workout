interface WorkoutType {
    users:{[key:string]:firebase.User};

    //computed
    active:boolean;
}