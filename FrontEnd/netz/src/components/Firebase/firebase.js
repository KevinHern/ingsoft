import app from 'firebase/app';
import axios from "axios";
import  *  as firebase from  'firebase';
import * as ROUTES from '../../Constants/routes';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
    // appId: process.env.REACT_APP_APP_ID
};


class Firebase {
    constructor() {
        app.initializeApp(config);
        this.appAuth = app.auth();
        this.googleProvider =  new firebase.auth.GoogleAuthProvider();
        this.db = firebase.firestore();
        this.functions = firebase.functions();
        this.rdb = firebase.database().ref(); //Real time database
    }

    getRedirectResult() {
        return this.appAuth.getRedirectResult();
    }


    doSignInWithGoogle() {
            // this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.googleProvider.addScope('profile');
        this.googleProvider.addScope('email');
        return this.appAuth.signInWithRedirect(this.googleProvider);
    }

    withEmailAndPassword(email, pass){
        return this.appAuth.createUserWithEmailAndPassword(email, pass)
            // .then(user => {
            //     console.log(config);
            //        console.log("Everything is fine")
            //     }
            //  )
            // .catch((error) => {
            //     console.log("Sorry boy");
            //     console.log(error);
            //     console.log("INFO");
            //     console.table(config);
            // });
    }

    doSignInWithEmailAndPassword(email, pass){
        return this.appAuth.signInWithEmailAndPassword(email, pass);
    }

    doSignOut = () => {
        return this.appAuth.signOut().then(function() {
            // Sign-out successful.
            console.log("Successful Sign Out");
        }).catch(function(error) {
            console.log(error.message)
        });
    };

    doEmailUpdate = (newEmail, pass) =>   {
        return this.doSignInWithEmailAndPassword(this.appAuth.currentUser.email, pass)
            .then(() =>{
                return this.appAuth.currentUser.updateEmail(newEmail)
            }).catch((error) => {
                console.log("It failed");
                return error;
            });
    };

    doPasswordUpdate = (newPass, oldPass) =>  {
        console.log(this.appAuth.currentUser.email);
        return this.doSignInWithEmailAndPassword(this.appAuth.currentUser.email, oldPass)
            .then(() =>{
              //  console.log("Changing password");
                return this.appAuth.currentUser.updatePassword(newPass);
            }).catch((error) => {
                console.log("It failed");
                return error;
            });
    };


    token = () =>  {
      if(this.appAuth.currentUser) {
          return this.appAuth.currentUser.getIdToken();
      }else{
          return false;
      }
    };

    callFunction = (name) => this.functions.httpsCallable(name);
    user = uid => this.db.collection('users').doc(uid);
    users = uid => this.db.collection('users')

    // doPasswordReset(email) {
    //     return this.appAuth.sendPasswordResetEmail(email)
    // };
    //

}

export default Firebase;
