import React, {Component as Com} from 'react';
import { withRouter } from 'react-router-dom';import * as ROUTES from "../../Constants/routes";
import AuthUserContext from "./context";
import {withFirebase} from "../Firebase";


const withAuthorization2 = condition => Component => {
    class WithAuthorization extends Com {
        constructor(props) {
            super(props);
            this.state = {
                role:null,
                authUser: null
            };
        }


        componentDidMount() {
            this.listener = this.props.fireBase.appAuth.onAuthStateChanged(
                authUser => {
                    if(authUser) {
                        authUser.getIdTokenResult(true).then((idTokenResult) => {
                            this.setState({role:idTokenResult.claims.role});
                            console.log(idTokenResult.claims.role);
                            this.setState({authUser});
                            console.log(authUser);
                            if(!condition(idTokenResult.claims.role)) {
                                this.props.history.push(ROUTES.HOME);
                            }
                        })
                    }else{
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                });

        }

        // condition = async (authUser) => {
        //     if(authUser === null) {
        //         return false;
        //     }else {
        //         const idTokenResult  = await authUser.getIdTokenResult(true);
        //         console.log(idTokenResult.claims);
        //         const role = idTokenResult.claims['role'];
        //         console.log(!role);
        //         return !role;
        //     }
        // };


        componentWillUnmount() {
            this.listener();
        }

        render(){
            const {role} = this.state;
            console.log(role);
            return(
                <AuthUserContext.Consumer>
                    {   authuser => condition(role) ? <Component {...this.props} /> : null}
                </AuthUserContext.Consumer>
            )
        }
    }
    return withRouter(withFirebase(WithAuthorization));
};


export default withAuthorization2;
