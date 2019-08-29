import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class GoogleSignUpButton extends Component {

    constructor(props) {
        super(props);
    }

    onClick = (e) => {
        // console.log("Button");
        // console.table(this.props);
        if (!this.props.fireBase.appAuth.currentUser) {
            this.props.fireBase.doSignInWithGoogle();
        }else{
            this.props.fireBase.doSignOut();
        }

    };

    render() {
        return (
            <div>
                <button onClick={this.onClick}>Sign in With Google</button>
            </div>
        );
    }

}




 export default withRouter(GoogleSignUpButton);
