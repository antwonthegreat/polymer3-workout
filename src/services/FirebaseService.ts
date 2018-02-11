
import * as firebase from "firebase";

class FirebaseService {
    constructor(){
        const config = {
            apiKey: "AIzaSyAO0R8DFOkI29Slh1ucfZ8kIhFh1MWy06Y",
            authDomain: "workout-a6473.firebaseapp.com",
            databaseURL: "https://workout-a6473.firebaseio.com",
            messagingSenderId:"557236145090"
        };
        firebase.initializeApp(config);
    }

    async signInIfNeeded(){
        return new Promise((resolve,reject)=>{
            firebase.auth().onAuthStateChanged((user:any)=>{
                if(user){
                    resolve(user);
                    return;
                }else{
                    this.signIn();  
                    reject();
                    return;
                }
            });
        });
    }

    async signIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log('signing in');
        firebase.auth().signInWithRedirect(provider);
        try{
            let result = await firebase.auth().getRedirectResult();
        }catch(error){
        }
    }

}

export{FirebaseService};