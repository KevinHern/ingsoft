import React, {Component as Com} from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import AuthUserContext from './context';
import * as ROUTES from '../../Constants/routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends Com {
        constructor(props) {
            super(props);
            this.state = {
                role:1
            };
        }


        componentDidMount() {
            this.listener = this.props.fireBase.appAuth.onAuthStateChanged(
              authUser => {
                if(authUser){
                    this.props.fireBase.user(authUser.uid).get().then((doc) => {
                        let role = 0;
                        if(doc && doc.exists){
                            const mydata = doc.data();
                            role =  mydata.role;
                            this.setState({role});
                        }
                        if (!condition(authUser, role)) {
                            this.props.history.push(ROUTES.HOME);
                        }
                    });
                }else{
                        this.props.history.push(ROUTES.SIGN_IN);
                }});
        }

        condition = async (authUser) => {
            if(authUser === null) {
                return false;
            }else {
                const idTokenResult  = await authUser.getIdTokenResult(true);
                console.log(idTokenResult.claims);
                const role = idTokenResult.claims['role'];
                console.log(!role);
                return !role;
            }
        };


        componentWillUnmount() {
            this.listener();
        }

        render(){
            const {role} = this.state;
            return(
                <AuthUserContext.Consumer>
                    {   authUser => condition(authUser, role) ? <Component {...this.props} /> : null}
                </AuthUserContext.Consumer>
            )
        }
    }
    return withRouter(withFirebase(WithAuthorization));
};


export default withAuthorization;
