import React from 'react';
import NavLink from "reactstrap/es/NavLink";
import {NavItem} from "reactstrap";




function Unsigned(props) {
    const {signIn} = props;
    return (
        <React.Fragment>
            {(signIn)?
                <React.Fragment>
                    <NavItem>
                        <NavLink  className="text-md-center" href="/">Landing</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  className="text-md-center" href="signUp">SignUp</NavLink>
                    </NavItem>
                </React.Fragment>
                 :
                <React.Fragment>
                    <NavItem>
                        <NavLink  className="text-md-center" href="/">Landing</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="signIn" className="text-md-center">SignIn</NavLink>
                    </NavItem>
                </React.Fragment>

            }
        </React.Fragment>
    );
}

export default Unsigned;