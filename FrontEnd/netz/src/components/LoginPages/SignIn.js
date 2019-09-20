import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import {Alert, Button, Col, FormText} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import GoogleSign from './GoogleSignUpButton'
import ButtonGroup from "reactstrap/es/ButtonGroup";

const SignInPage = () => (
    <div>
        <SignInForm  key= 'signIn'/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);


        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        const API_PATH = 'http://localhost/ingsoft/src/SignUp.php';
        this.props.fireBase.getRedirectResult( this.props.history, API_PATH);
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.fireBase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                //By now always, but it is not meant to go to Uconfig all the time
                this.props.history.push(ROUTES.UCONFIG);
            })
            .catch(error => {
                this.setState({ error });
                console.log(error);
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <React.Fragment>
                {(error)? <Alert color={"danger"}>{error.message}</Alert>: null}
                <Form onSubmit = {this.onSubmit} className="align-middle">
                    <FormGroup row className="justify-content-md-center">
                    <h1>Sign In</h1>
                    </FormGroup>
                    <FormGroup row className="justify-content-md-center mt-3">
                        <Label for = "email"  sm={2}>Email</Label>
                        <Col sm={5}>
                        <Input type = "email" name = "email" id="email" value={email} onChange = {this.onChange}/>
                        </Col>
                    </FormGroup >
                    <FormGroup row className="justify-content-md-center mt-3">
                        <Label for = "password" sm={2}>Password</Label>
                        <Col sm={5}>
                        <Input type = "password" name = "password" id="password" value={password} onChange = {this.onChange}/>
                        </Col>
                    </FormGroup >
                    <FormGroup row className="justify-content-md-center mt-3">
                     <ButtonGroup >
                         <Button  disabled={isInvalid} type = "Submit" className="mr-3" color = "primary">
                             Sign In</Button>
                         <FormText color="muted">
                                 Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                         </FormText>
                     </ButtonGroup>
                    </FormGroup>
                    <FormGroup  row className="justify-content-md-center mt-3">
                        <GoogleSign message = { "Sign In with Google"}/>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));
export default SignInPage;
export { SignInForm };