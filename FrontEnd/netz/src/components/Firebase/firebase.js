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

    getRedirectResult(history, API_PATH = false) {
        this.appAuth.getRedirectResult().then((result) => {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // let token = result.credential.accessToken;
                let apiToken = result.credential.idToken;
                let idToken = result.user._lat;
                // console.log("Token");
                // console.log(token);
                let user = result.user;
                console.log("User");
                console.log(user);
                console.log("Result");
                console.log(result);
                if(result.additionalUserInfo.isNewUser){
                    if(API_PATH){
                        axios({
                            method: 'post',
                            url: `${API_PATH}`,
                            headers: { 'content-type': 'application/json' },
                            data: {idToken, name:result.additionalUserInfo.profile.name ,
                                email:result.additionalUserInfo.profile.email, pass:"", role: 0}
                        })
                            .then(result => {
                                let thing = result.data;
                                console.table(thing);
                                history.push(ROUTES.UCONFIG);
                            })
                            .catch(error =>
                                // {this.setState({ error: error.message })
                                console.log(error)
                            );
                    }
                }else{
                    history.push(ROUTES.UCONFIG);
                }
            }
            // return "failed";
            // The signed-in user info

        })
            .catch((error) => {
                console.log(error);
                console.log("Not everything works kiddo")
            })
    }


    doSignInWithGoogle() {
            // this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.googleProvider.addScope('profile');
        this.googleProvider.addScope('email');
        this.appAuth.signInWithRedirect(this.googleProvider)
                .then(() => {

                })
                .catch((e) => {
                    console.log("Failed sign in");
                    console.log(e.message);
                })
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

    // doPasswordReset(email) {
    //     return this.appAuth.sendPasswordResetEmail(email)
    // };
    //
    // doPasswordUpdate (pass) {
    //     return this.appAuth.currentUser.updatePassword(pass)} ;


    token = () =>  {
      if(this.appAuth.currentUser) {
          return this.appAuth.currentUser.getIdToken();
      }else{
          return false;
      }
    };



    getIdToken = (API_PATH, state) => {
        return this.appAuth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            axios({
                            method: 'post',
                            url: `${API_PATH}`,
                            headers: { 'content-type': 'application/json' },
                            data: {idToken, name:state.username ,
                                email:state.email, pass:state.passwordOne, role: 0}
                        })
                            .then(result => {
                                let thing = result.data;
                                console.table(thing);
                            })
                            .catch(error =>
                                console.log(error)
                            );
        }).catch(function(error) {
            console.log(error);
        });
    };


    callFunction = (name) => this.functions.httpsCallable(name);
    user = uid => this.db.collection('users').doc(uid);
    users = uid => this.db.collection('users')

}

export default Firebase;
