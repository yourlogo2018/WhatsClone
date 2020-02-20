const firebase = require('firebase');
require('firebase/firestore');


export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyBp9ojd2xBxN4-nbuwXUU94WkPwIfm94t4",
            authDomain: "whatsapp-clone-60f73.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-60f73.firebaseio.com",
            projectId: "whatsapp-clone-60f73",
            storageBucket: "gs://whatsapp-clone-60f73.appspot.com",
            messagingSenderId: "282201661962",
            appId: "1:282201661962:web:dae0a209f72bc3c5bdf5f3",
            measurementId: "G-8KT6S0X03P"
        };
  
        this.init();

    }

    init(){

        if (!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }


    }

    static db() {

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();

    }

    initAuth() {
        
        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });
            })
            .catch(err=>{
                f(err);
            });
        });
    }
    


}