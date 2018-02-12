interface LiftType {
    users:{[key:string]:firebase.User};

    //computed
    active:boolean;
}