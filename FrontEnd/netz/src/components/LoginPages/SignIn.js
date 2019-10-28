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
import firebase from "firebase";
import {PassCom } from '../User/Modify';
import axios from "axios";
import Spinner from "reactstrap/es/Spinner";
import Spinners from "../Wait";
const SignInPage = () => (
    <div>
        <SignInForm  key= 'signIn'/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    hidePass:true,
    wait:false
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);


        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        const API_PATH = 'http://localhost/ingsoft/src/SignUp.php';
        const promise  = this.props.fireBase.getRedirectResult();
        this.setState({wait:true});
        promise.then((result) => {
                if(result.user){
                    this.setState({wait:true});
                }else{
                    this.setState({wait:false});
                }
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
                                    setTimeout(()=> this.props.history.push(ROUTES.UCONFIG), 500);
                                })
                                .catch(error =>
                                    // {this.setState({ error: error.message })
                                    console.log(error)
                                );
                        }
                    }else{
                        setTimeout(()=> this.props.history.push(ROUTES.HOME), 500);

                    }
                }
            })
            .catch((error) => {
                console.log(error);
                console.log("Not everything works kiddo")
            });
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.setState({wait:true});
        this.props.fireBase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                //By now always, but it is not meant to go to Uconfig all the time
                // firebase.users().
                setTimeout(() => {
                    this.props.history.push(ROUTES.UCONFIG);
                }, 1000)
            })
            .catch(error => {
                this.setState({ error, wait:false});
                console.log(error);
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toggleHide = () => {
        const{hidePass} = this.state;
       this.setState({hidePass: !hidePass});
    };
    render() {
        const { email, password, error, hidePass, wait} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <React.Fragment>
                {
                    (wait)?
                        <Spinners/>
                        :
                        <React.Fragment>
                            {(error)? <Alert color={"danger"}>{error.message}</Alert>: null}
                            <Form onSubmit = {this.onSubmit} className="align-middle">
                                <FormGroup row className="justify-content-md-center">
                                    <h1>Sign In</h1>
                                </FormGroup>
                                <FormGroup row className="justify-content-md-center mt-3">
                                    <Col sm={1}>
                                        <Label for = "email">Email</Label>
                                    </Col>
                                    <Col sm={4}>
                                        <Input type = "email" name = "email" id="email" value={email} onChange = {this.onChange}/>
                                    </Col>
                                    <Col sm={1}>
                                    </Col>
                                </FormGroup >
                                <FormGroup row className="justify-content-md-center mt-3">
                                    <PassCom hidePass={hidePass} onChange={this.onChange} toggleHide ={this.toggleHide} name={"password"} label={"Password"} pass={password}/>
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
                }

            </React.Fragment>
        );
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));
export default SignInPage;
export { SignInForm };