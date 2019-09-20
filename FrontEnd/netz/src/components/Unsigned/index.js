import React from 'react';
import NavLink from "reactstrap/es/NavLink";
import {NavItem} from "reactstrap";




function Unsigned(props) {
    const {signIn} = props;
    return (
        <React.Fragment>
            {(signIn)?
                <NavItem>
                    <NavLink href="signUp">SignUp</NavLink>
                </NavItem> :
                <NavItem>
                    <NavLink href="signIn" className="text-md-center">SignIn</NavLink>
                </NavItem>
            }
        </React.Fragment>
    );
}

export default Unsigned;