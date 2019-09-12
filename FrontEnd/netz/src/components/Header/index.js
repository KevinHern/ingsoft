import React from 'react';
import {Button, Navbar, NavItem,ButtonGroup, Nav, Media, Col, Row} from "reactstrap";
import NavLink from "reactstrap/es/NavLink";
// import Logo from "../Logo/Logo";

import {AuthUserContext} from '../Session';
import logo from '../../resource/logo.jpg';
import './Header.css';
import Signed from '../Signed';
import Unsigned from '../Unsigned';


function Header(props) {
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
                                {authUser => authUser ? <Signed/> : <Unsigned/>}
                                </AuthUserContext.Consumer>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </header>


    );
}

export default Header;
