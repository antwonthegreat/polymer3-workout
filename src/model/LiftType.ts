interface LiftType {
    users:{[key:string]:firebase.User};
    name:string;
    timed:{key:string};

    //computed
    active:boolean;
}