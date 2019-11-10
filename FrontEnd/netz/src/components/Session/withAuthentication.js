import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }
        componentDidMount() {
            this._isMounted = true;
            this.listener = this.props.fireBase.appAuth.onAuthStateChanged(
                authUser => {
                    if(authUser && this._isMounted){
                         this.setState({ authUser })
                    }else {
                        if(this._isMounted)  this.setState({authUser: null});
                    }
                }
            );
        }
        componentWillUnmount() {
            this.listener();
            this._isMounted = false
        }


        render() {
            const {authUser} = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component {...this.props}/>
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};
export default withAuthentication;