import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../LoginPages/SignOut';
import * as ROUTES from '../../constants/routes';

const Main = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

export default Main;








