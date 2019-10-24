import React from 'react';

import {Button, Col, Row, Media} from "reactstrap";
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Container from "reactstrap/es/Container";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {Password, PhoneList, Email, Role, UpdateFieldCom, StatusModify, Photo} from './Modify/';
import NoMatch from "../NoMatch/NoMatch";
import logo from "../../resource/logo.jpg";
import {PHOTOEND, PROFILE} from "../../Constants/Endpoint";

const route = (goTo) =>{
    this.props.history.push(goTo);
};



function OverviewInd(props) {
    const {firstname, lastname, nationality, birthdate, biography, organization, email, role, phones, route, folderid} = props;
    // console.log(phones)
    // const {field} = this.state;
    // const {authUser} = this.props;
    let {path} = useRouteMatch();
    // console.log(path);
    // console.log('Role' + role);
    const phoneList = Object.values(phones).map((phone) =>
        <div key={phone}>{phone}</div>
    );
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${path}/:typeMode/name`} render = {(props) =>
                    <UpdateFieldCom {...props} inputs = {[{fieldName: 'Nombre', type : 'text', value : firstname, field: 'firstname'}, {fieldName: 'Apellido', type : 'text', value : lastname, field: "lastname",}]} />}/>
                <Route path={`${path}/:typeMode/email`} render = {(props) =>
                    <Email  {...props} field ={'Email'}  value={email} />}/>
                <Route path={`${path}/:typeMode/password`} render = {(props) =>
                    <Password {...props} field ={'Clave'}/>}/>
                <Route path={`${path}/:typeMode/role`} render = {(props) =>
                    <Role {...props} field ={'Role'}  value={role} />}/>
                <Route path={`${path}/:typeMode/phone`} render = {(props) =>
                    <PhoneList {...props} field ={'Telefono'}  value={Object.values(phones)} allowExtra = {true}/>}/>
                <Route path={`${path}/:typeMode/nat`} render = {(props) =>
                    <UpdateFieldCom {...props} inputs = {[{fieldName: 'Nacionalidad', type : 'text', value : nationality,  field: "nationality",}]} />}/>
                <Route path={`${path}/:typeMode/birth`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{fieldName: 'Fecha de nacimiento', type : 'date', value : birthdate, field: "birthdate",}]} />}/>
                <Route path={`${path}/:typeMode/bio`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{fieldName: 'Biografía', type : 'textarea', value : biography,  field: "biography", }]} />}/>
                <Route path={`${path}/:typeMode/aff`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{fieldName: 'Organizacion Afiliada', type : 'text', value : organization,  field: "org",}]} />}/>
                <Route path={`${path}/:typeMode/modify/:status`} render ={(props) =>
                     <StatusModify  {... props}/>
                }/>
                <Route path={`${path}/:typeMode/photo`} render = {(props) =>
                    <Photo {...props} value={folderid} route={route}/>}/>
                <Route exact path={path}>
                    <Container>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <h1>Informacion de Usuario</h1>
                            </Col>
                        </Row>
                        <Row className={"mt-3"}>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Nombre
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/name`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {firstname} {lastname}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Email
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/email`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {email}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Password
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/password`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    **********
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Roles
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/role`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {(role !== "0") ?
                                                        (role === "1") ?
                                                            <p> Emprendedor </p>
                                                            :
                                                            (role === "2") ?
                                                                <p> Financista </p>
                                                                :
                                                                <div>
                                                                    <p> Emprendedor </p>
                                                                    <p> Financista </p>
                                                                </div>
                                                        : <p> No tiene roles asignados </p>}
                                                </Col>
                                            </Row>

                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Teléfonos
                                                    </h4>
                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/phone`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    <div>
                                                        {phoneList}
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Nacionalidad
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/nat`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {nationality}
                                                </Col>
                                            </Row>

                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Fecha de nacimiento
                                                    </h4>

                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/birth`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {birthdate}
                                                </Col>
                                            </Row>

                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Biografía
                                                    </h4>
                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/bio`)}>
                                                        Modify
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col sm={{size: 6}}>
                                                    {biography}
                                                </Col>
                                            </Row>

                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        {
                            (organization) ?
                                <Row>
                                    <Col sm={{size: 6, offset: 3}}>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Container className={"justify-content-center"}>
                                                    <Row>
                                                        <Col sm={{size: 9}}>
                                                            <h4>
                                                                Organización afiliada
                                                            </h4>
                                                        </Col>
                                                        <Col sm={{size: 2}}>
                                                            <Button color={'warning'} onClick={() => route(`${path}/ind/aff`)}>
                                                                Modify
                                                            </Button>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col sm={{size: 6}}>
                                                            {organization}
                                                        </Col>
                                                    </Row>

                                                </Container>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>
                                : null
                        }
                        <Row>
                            <Col sm={{size: 6, offset: 3}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Container className={"justify-content-center"}>
                                            <Row>
                                                <Col sm={{size: 9}}>
                                                    <h4>
                                                        Foto
                                                    </h4>
                                                </Col>
                                                <Col sm={{size: 2}}>
                                                    <Button color={'warning'} onClick={() => route(`${path}/ind/photo`)}>
                                                        Modify
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Media className="ml-3 w-25" object src = {`${PHOTOEND}${folderid}/${PROFILE}`} alt = "profile"/>
                                        </Container>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </Route>
                <Route>
                    <NoMatch/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default OverviewInd;

