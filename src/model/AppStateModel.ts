interface AppStateModel {
    user:firebase.User;
    workoutSummaries:{[key:string]:WorkoutSummary};
    liftTypes:{[key:string]:LiftType};
    workoutTypes:{[key:string]:WorkoutType};
}