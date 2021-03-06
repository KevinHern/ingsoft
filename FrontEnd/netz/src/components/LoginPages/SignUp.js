import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import GoogleSign from "./GoogleSignUpButton";
import {Form, FormGroup, Label, Button, Input, Col, FormText, Alert} from "reactstrap";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import {SIGNUP} from "../../Constants/Endpoint";
import axios from "axios";
import {HOME} from "../../Constants/routes";
import {UCONFIG} from "../../Constants/routes";
import {PassCom} from '../User/Modify';
import Spinners from "../Wait";


const SignUpPage = () => (
    <div>
        <SignUpForm key= 'signUp'/>
    </div>
);
const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    hidePass: [true, true],
    wait:false
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


    //Using FireStore
//     onSubmit = event => {
//         event.preventDefault();
//         const { username, email, passwordOne } = this.state;
// //     User process has not finished
//         const role = 0;
//         const {fireBase} = this.props;
//         return fireBase.withEmailAndPassword(email, passwordOne)
//             .then(authUser => {
//                 console.log(authUser);
//                 //Setting a user in Firestore, but now without a name
//                 fireBase.user(authUser.user.uid).set({
//                            email,
//                            role
//                        }).then(() =>  {
//                             console.log("Just before axios");
//                             fireBase.getIdToken(SIGNUP, this.state)
//                                 .then(() => {
//                                     //Always to UCONFIG
//                                     this.props.history.push(ROUTES.UCONFIG);
//                                 }).catch(error => {
//                                 this.setState({ error });
//                                 console.log(error);
//                             });
//                             this.setState({ ...INITIAL_STATE });
//                }).catch((error) => {
//                     this.setState({ error });
//                     console.log("FireStore user");
//                     console.log(error);
//                });
//             })
//             .catch(error => {
//                 this.setState({ error });
//                 console.log("With email and password");
//                 console.log(error);
//             });
//     };

    onSubmit = event => {
        event.preventDefault();
        const {email, passwordOne } = this.state;
//     User process has not finished
        const role = 0;
        const {fireBase} = this.props;
        this.setState({wait:true});
        fireBase.withEmailAndPassword(email, passwordOne)
            .then(credential => {
                credential.user.getIdToken().then((idToken) => {
                    axios({
                        method: 'post',
                        url: SIGNUP,
                        headers: { 'content-type': 'application/json' },
                        data: {idToken, email, pass:passwordOne, role: 0}
                    }).then(result => {
                        let status = result.data.status;
                        if(status) {
                            setTimeout(() =>this.props.history.push(UCONFIG), 500);
                            console.table(result.data);
                        }else{
                            this.setState({error:result.data, wait:false});
                        }
                    })
                        .catch(error =>
                            this.setState({ error, wait:false } )
                        );

                }).catch(() => console.log("Get id Token"));
            }) .catch(error => {
                this.setState({ error,wait:false });
                console.log("With email and password");
                console.log(error);
            });

    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toggleEye = (pass) => {
        const{hidePass} = this.state;
        hidePass[pass] = !hidePass[pass];
        this.setState({hidePass});
    };

    render() {
        const {
            email,
            passwordOne,
            passwordTwo,
            error,
            hidePass,
            wait
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === ''
        return (
            <React.Fragment>
            {(wait)?
                <Spinners/>
                :
                <React.Fragment>
                    {(error)? <Alert color={"danger"}>{error.message}</Alert>: null}
                    <Form onSubmit = {this.onSubmit}  key={"SignUp"}   className="align-middle">
                        <FormGroup row className="justify-content-md-center mt-3">
                            <h1>SignUp</h1>
                        </FormGroup>
                        <FormGroup row className="justify-content-md-center">
                            <Col sm={{ size: 1 }}>
                                <Label>Email</Label>
                            </Col>
                            <Col sm={4}>
                                <Input onChange = {this.onChange} type="email" name="email" id="email"/>
                            </Col>
                            <Col sm ={{ size: 1}}>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="justify-content-md-center">
                            <PassCom name={"passwordOne"} hidePass={hidePass[0]} label={"Password"}  onChange={this.onChange}  toggleHide={() => this.toggleEye(0)}/>
                        </FormGroup>
                        <FormGroup row className="justify-content-md-center">
                            <PassCom name={"passwordTwo"} hidePass={hidePass[1]}  label={"Retype Password"} onChange={this.onChange}  toggleHide={() => this.toggleEye(1)}/>
                        </FormGroup>
                        <FormGroup row className="justify-content-md-center">
                            <ButtonGroup>
                                <Button  disabled={isInvalid} type = "Submit" className="mr-3" color = "primary">
                                    Sign Up</Button>
                                <FormText color="muted">
                                    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                                </FormText>
                            </ButtonGroup>
                        </FormGroup>
                    </Form>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm};