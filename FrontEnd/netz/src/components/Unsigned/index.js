import React from 'react';
import NavLink from "reactstrap/es/NavLink";
import {NavItem} from "reactstrap";




function Unsigned(props) {
    return (
        <React.Fragment>
            <NavItem>
                <NavLink href="signIn" className="text-md-center">SignIn</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="signUp">SignUp</NavLink>
            </NavItem>
        </React.Fragment>
    );
}

export default Unsigned;