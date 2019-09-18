import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import GoogleSign from "./GoogleSignUpButton";
import {Form, FormGroup, Label, Button, Input, Col, FormText} from "reactstrap";
import ButtonGroup from "reactstrap/es/ButtonGroup";


const SignUpPage = () => (
    <div>
        <SignUpForm key= 'signUp'/>
    </div>
);
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {


    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    // componentDidMount() {
    //     const API_PATH = 'http://localhost/ingsoft/src/SignUp.php';
    //     this.props.fireBase.getRedirectResult(this.props.history, API_PATH);
    // }

    onSubmit = event => {
        event.preventDefault();
        const { username, email, passwordOne } = this.state;
       const {fireBase} = this.props;
        return fireBase.withEmailAndPassword(email, passwordOne)
            .then(authUser => {
                const API_PATH = 'http://localhost/ingsoft/src/SignUp.php';
                fireBase.getIdToken(API_PATH, this.state)
                    .then(() => {
                        this.props.history.push(ROUTES.UCONFIG);
                    });
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
    };


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
               <Form onSubmit = {this.onSubmit}  key={"SignUp"}   className="align-middle">
                   <FormGroup row className="justify-content-md-center mt-3">
                       <h1>SignUp</h1>
                   </FormGroup>
                   <FormGroup row className="justify-content-md-center">
                       <Label for="userName" sm={2}>Nombre</Label>
                       <Col sm={5}>
                           <Input onChange = {this.onChange} type="type" name="username" id="username"/>
                       </Col>
                   </FormGroup>
                   <FormGroup row className="justify-content-md-center">
                       <Label for = "email" sm={2}>Email</Label>
                       <Col sm={5}>
                       <Input onChange = {this.onChange} type="email" name="email" id="email"/>
                       </Col>
                   </FormGroup>
                   <FormGroup row className="justify-content-md-center">
                       <Label for = "password" sm={2}>Password</Label>
                       <Col sm={5}>
                       <Input onChange = {this.onChange} type="password" name="passwordOne" id="passwordOne"/>
                       </Col>
                   </FormGroup>
                   <FormGroup row className="justify-content-md-center">
                       <Label for = "password" sm={2}>Retype Password</Label>
                       <Col sm={5}>
                            <Input onChange = {this.onChange} type="password" name="passwordTwo" id="passwordTwo"/>
                       </Col>
                   </FormGroup>
                   <FormGroup row className="justify-content-md-center">
                       {/*<ButtonGroup className="d-flex justify-content-center" >*/}
                       {/*    <Button color="primary" disabled={isInvalid}>Sign Up</Button>*/}
                       {/*    <GoogleSign message = {"Sign Up with Google"}/>*/}
                       {/*</ButtonGroup>*/}
                       <ButtonGroup>
                               <Button  disabled={isInvalid} type = "Submit" className="mr-3" color = "primary">
                                   Sign In</Button>
                               <FormText color="muted">
                                       Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                               </FormText>
                       </ButtonGroup>
                   </FormGroup>
                   {/*<FormGroup row className="justify-content-md-center">*/}
                   {/*    <GoogleSign message = { "Sign Up with Google"}/>*/}
                   {/*</FormGroup>*/}
                   {error && <p>error.message</p>}
               </Form>

        );
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, GoogleSign};