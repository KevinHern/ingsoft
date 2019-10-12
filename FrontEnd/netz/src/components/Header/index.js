import React from 'react';
import {Button, Navbar, NavItem,ButtonGroup, Nav, Media, Col, Row} from "reactstrap";
import NavLink from "reactstrap/es/NavLink";
// import Logo from "../Logo/Logo";

import {AuthUserContext} from '../Session';
import logo from '../../resource/logo.jpg';
import './Header.css';
import Signed from '../Signed';
import Unsigned from '../Unsigned';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';


function Header(props) {
    const {pathname} = props.location;
    return (
            <header>
                <Row>
                    <Col sm="12" md="12" lg="12">
                        <Navbar expand="md">
                            <Media>
                                <Media left>
                                    <Media  className="ml-3 w-25" object src = {logo} alt = "logo"/>
                                </Media>
                            </Media>
                            <Nav className="ml-auto pr-4 text-md-center">
                                <AuthUserContext.Consumer>
                                {(authUser) => {
                                    if(authUser){
                                       return <Signed/>;
                                       // console.log("Signed");
                                       // console.log(authUser);
                                    }else{
                                        if((pathname).toLowerCase() === ROUTES.SIGN_IN.toLocaleLowerCase()){
                                            // console.log("Unsigned Show Sign UP");
                                            return <Unsigned signIn ={true}/>
                                        }else{
                                            // console.log("Unsigned Show Sign In");
                                            return <Unsigned signIn ={false}/>
                                        }
                                    }
                                }}
                                </AuthUserContext.Consumer>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </header>


    );
}

export default withRouter(Header);
