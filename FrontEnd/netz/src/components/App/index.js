import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import SignUpPage from '../LoginPages/SignUp';
import SignInPage from '../LoginPages/SignIn';
import Header from '../Header';
import Footer from '../Footer';
import * as ROUTES from '../../Constants/routes';
import Landing from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage'
import React from 'react';
import {withAuthentication} from "../Session";
import './App.css';
import Container from "reactstrap/es/Container";
import SignOutButton from '../LoginPages/SignOut';

const App = () => {
    return (
        <Container fluid className="min-vw-100 min-vh-100">
            <Router>
                        <Header/>
                        <Container>
                        <Route exact path={ROUTES.LANDING} component={Landing} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.HOME} component = {HomePage}/>
                        </Container>
                        <Footer/>
            </Router>
        </Container>
    );
};

export default withAuthentication(App);