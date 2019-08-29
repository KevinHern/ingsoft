import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import GoogleSignUpButton from "./GoogleSignUpButton";



const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm key= 'signUp'/>
        <GoogleSignUp/>
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

    componentDidMount() {
        console.log(this.props);
        this.props.fireBase.getRedirectResult( this.props.history);
    }


    onSubmit = event => {
        event.preventDefault();
        const { username, email, passwordOne } = this.state;
        // console.log(this.props.history);
        // console.log(this.props.location);
        // console.log(this.props.match);
        // console.log(this.props.fireBase);
        // console.log(this.props.staticContext);
       const {fireBase} = this.props;
        // eslint-disable-next-line
        // console.log(fireBase.withEmailAndPassword);
        return fireBase.withEmailAndPassword(email, passwordOne)
            .then(authUser => {
                const API_PATH = 'http://localhost/integration/api/SignUp.php';
                fireBase.getIdToken(API_PATH, this.state)
                    .then(() => {
                        this.props.history.push("/counter");
                        console.log("Counter go")
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
               <form onSubmit={this.onSubmit} key={"SignI"}>
                   <input
                       name="username"
                       value={username}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Full Name"
                   />
                   <input
                       name="email"
                       value={email}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Email Address"
                   />
                   <input
                       name="passwordOne"
                       value={passwordOne}
                       onChange={this.onChange}
                       type="password"
                       placeholder="Password"
                   />
                   <input
                       name="passwordTwo"
                       value={passwordTwo}
                       onChange={this.onChange}
                       type="password"
                       placeholder="Confirm Password"
                   />
                   <button disabled={isInvalid} type="submit">Sign Up</button>
                   {error && <p>{error.message}</p>}
               </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
const GoogleSignUp = withFirebase(GoogleSignUpButton);
export default SignUpPage;
export { SignUpForm, SignUpLink, GoogleSignUp};