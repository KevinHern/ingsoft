import React from 'react';
import { NavItem, NavLink} from "reactstrap";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';


const Signed = ({fireBase})  => (
    <NavItem>
        <NavLink href={ROUTES.LANDING} className="text-md-center" onClick={fireBase.doSignOut}>SignOut</NavLink>
    </NavItem>
);

export default withFirebase(Signed);