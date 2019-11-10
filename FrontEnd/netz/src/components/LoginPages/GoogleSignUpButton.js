import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from "../Firebase";
import {Button} from  'reactstrap';
import PropTypes from 'prop-types';

class GoogleSignUpButton extends Component {

    constructor(props) {
        super(props);
    }

    onClick = (e) => {
        if (!this.props.fireBase.appAuth.currentUser) {
            this.props.fireBase.doSignInWithGoogle().then(() => {
               // this.props.rollSpinner();
            })
                .catch((e) => {
                    console.log("Failed sign in");
                    console.log(e.message);
                });
        }else{
            this.props.fireBase.doSignOut();
        }

    };

    render() {
        const {message} = this.props;
        return (
            <div>
                <Button onClick={this.onClick} color = "danger">{message}</Button>
            </div>
        );
    }

}

GoogleSignUpButton.propTypes = {
  message: PropTypes.string,
  fireBase: PropTypes.object
};
 export default withFirebase(withRouter(GoogleSignUpButton));
