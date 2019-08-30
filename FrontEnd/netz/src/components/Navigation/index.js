import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../LoginPages/SignOut';
import * as ROUTES from '../../Constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = ({authUser}) => (

        <AuthUserContext.Consumer>
            {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth/>}
        </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </ul>
);
const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
    </ul>
);

export default Navigation;








