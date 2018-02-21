/// <reference path="../../node_modules/firebase/index.d.ts" />
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAO0R8DFOkI29Slh1ucfZ8kIhFh1MWy06Y",
    authDomain: "workout-a6473.firebaseapp.com",
    databaseURL: "https://workout-a6473.firebaseio.com",
    messagingSenderId:"557236145090"
};
firebase.initializeApp(config);

class FirebaseService {
    constructor(){
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

    async getAsync<T>(path: string, id?: string, orderBy: string = '', last: number = 0, first: number = 0):Promise<{[key:string]:T}> {
        let query:firebase.database.Query = firebase.database().ref(path);
        if (id) {
            query = query.orderByKey().equalTo(id);
        } else if (orderBy) {
            query = query.orderByChild(orderBy);
        }

        if (last) {
            query = query.limitToLast(last);
        }

        if (first) {
            query = query.limitToFirst(first);
        }

        const response = await query.once('value');

        let val = response.val();
        if (!val) {
            return {};
        }

        if(id){
            val[id].id = id;
        }
        return val;    
    }

}

export{FirebaseService};