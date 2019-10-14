import React from 'react';
import { NavItem, NavLink} from "reactstrap";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';


const Signed = ({fireBase})  => (
    <React.Fragment>
        <NavItem>
            <NavLink href={ROUTES.HOME} className="text-md-center" >Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={ROUTES.OVERVIEW} className="text-md-center" >Cuenta</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={ROUTES.BANDEJA} className="text-md-center" >Bandeja</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href={ROUTES.LANDING} className="text-md-center" onClick={fireBase.doSignOut}>SignOut</NavLink>
        </NavItem>
    </React.Fragment>
);

export default withFirebase(Signed);