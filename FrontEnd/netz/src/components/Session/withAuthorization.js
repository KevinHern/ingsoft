import React, {Component as Com} from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import AuthUserContext from './context';
import * as ROUTES from '../../Constants/routes';

const withAuthorization = (condition) => Component => {
    class WithAutorization extends Com {

        componentDidMount() {
            this.listener = this.props.fireBase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }



        render(){
            // return <Component {...this.props}/>;
            return(
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
    return withRouter(withFirebase(WithAutorization));
};


export default withAuthorization;