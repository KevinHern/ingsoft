import React from 'react';
import { NavItem, NavLink, Button} from "reactstrap";
import { withFirebase } from '../Firebase';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
function Signed(props) {
    return (
        <React.Fragment>
            <Button color={'link'} onClick={() => props.history.push(ROUTES.HOME)} >
                Home
            </Button>
            <Button color={'link'} onClick={() => props.history.push(ROUTES.OVERVIEW)}>
                Cuenta
            </Button>
            <Button  color={'link'} onClick={() => props.history.push(ROUTES.BANDEJA)}>
                Bandeja
            </Button>
            <Button  color={'link'} onClick={() => props.fireBase.doSignOut().then(() => props.history.push(ROUTES.LANDING))}>
                SignOut
            </Button>
        </React.Fragment>
    );
}
 export default withRouter(withFirebase(Signed));
{/*const Signed =  ({fireBase})  => (*/}
{/*    <React.Fragment>*/}
{/*        /!*<NavItem>*!/*/}
{/*        /!*    <NavLink href={ROUTES.HOME} className="text-md-center" >Home</NavLink>*!/*/}
{/*        /!*</NavItem>*!/*/}
{/*        /!*<NavItem>*!/*/}
{/*        /!*    <NavLink href={ROUTES.OVERVIEW} className="text-md-center" >Cuenta</NavLink>*!/*/}
{/*        /!*</NavItem>*!/*/}
{/*        /!*<NavItem>*!/*/}
{/*        /!*    <NavLink href={ROUTES.BANDEJA} className="text-md-center" >Bandeja</NavLink>*!/*/}
{/*        /!*</NavItem>*!/*/}
{/*        /!*<NavItem>*!/*/}
{/*        /!*    <NavLink href={ROUTES.LANDING} className="text-md-center" onClick={fireBase.doSignOut}>SignOut</NavLink>*!/*/}
{/*        /!*</NavItem>*!/*/}
{/*    </React.Fragment>*/}
{/*);*/}

// export default withFirebase(Signed);

