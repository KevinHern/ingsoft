import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';


import SignUpPage from '../LoginPages/SignUp';
import SignInPage from '../LoginPages/SignIn';
import Main from  '../Main';
import * as ROUTES from '../../constants/routes';

const App = () => (
    <Router>
        <div>
            <Main/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            {/*<Route path='/counter' component={Counter} />*/}
        </div>
    </Router>
);

export default App;