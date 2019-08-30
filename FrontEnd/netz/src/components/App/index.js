import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import SignUpPage from '../LoginPages/SignUp';
import SignInPage from '../LoginPages/SignIn';
import Navigation from '../Navigation';
import * as ROUTES from '../../Constants/routes';
import Landing from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage'


import React from 'react';
import {withAuthentication} from "../Session";

const App = () => {
    return (
        <Router>
                <div>
                    {/*<Route path="/" component={Main} />*/}
                    <Navigation/>
                    <hr/>
                    <Route exact path={ROUTES.LANDING} component={Landing} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component = {HomePage}/>
                </div>
            </Router>
    );
};

export default withAuthentication(App);