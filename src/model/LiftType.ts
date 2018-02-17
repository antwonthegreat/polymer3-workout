interface LiftType {
    users:{[key:string]:firebase.User};
    name:string;

    //computed
    active:boolean;
}