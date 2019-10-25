import React from 'react';
import Container from "reactstrap/es/Container";
import {Button, Col, Media, Row} from "reactstrap";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {Email, Password, PhoneList, Photo, Role, StatusModify, UpdateFieldCom} from "./Modify";
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {PHOTOEND, PROFILE} from "../../Constants/Endpoint";

function OverviewOrg(props) {
    const {email, role, name, description, country, location, phone, route, folderid} = props;
    let {path} = useRouteMatch();
    return (
        <React.Fragment>
            <Switch>
            <Route path={`${path}/:typeMode/name`} render = {(props) =>
                <UpdateFieldCom {...props} inputs = {[{fieldName: 'Nombre', type : 'text', value : name, field: 'name'}]} />}/>
            <Route path={`${path}/:typeMode/email`} render = {(props) =>
                <Email  {...props} field ={'Email'}  value={email} />}/>
            <Route path={`${path}/:typeMode/password`} render = {(props) =>
                <Password {...props} field ={'Clave'}/>}/>
            <Route path={`${path}/:typeMode/role`} render = {(props) =>
                <Role {...props} field ={'Role'}  value={role} />}/>
            <Route path={`${path}/:typeMode/phone`} render = {(props) =>
                <PhoneList {...props} field ={'Telefono'}  value={[phone]} allowExtra = {false}/>}/>
            <Route path={`${path}/:typeMode/desc`} render = {(props) =>
                <UpdateFieldCom {...props} inputs = {[{fieldName: 'Descripción', type : 'textarea', value : description, field : 'description' }]} />}/>
            <Route path={`${path}/:typeMode/location`} render = {(props) =>
                <UpdateFieldCom {...props}  inputs = {[{fieldName: 'País', type : 'text', value : country, field: 'country'},
                    {fieldName: 'Dirección', type : 'text', value : location, field: 'location'}]} />}/>
            <Route path={`${path}/:typeMode/modify/:status`} render ={(props) =>
                    <StatusModify  {... props}/>
                }/>
             <Route path={`${path}/:typeMode/photo`} render = {(props) =>
                    <Photo {...props} value={folderid} route={route}/>}/>
            <Route exact path={path}>
                        <Container>
                            <Row>
                                <Col sm={{size: 6, offset: 3}}>
                                    <h1>Informacion de Organizacion</h1>
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
                                                            Nombre:
                                                        </h4>
                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/name`)}>
                                                            Modify
                                                        </Button>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col sm={{size: 6}}>
                                                        {name}
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
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/email`)}>
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
                                                            Clave
                                                        </h4>

                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/password`)}>
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
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/role`)}>
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
                                                            Descripcion
                                                        </h4>

                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/desc`)}>
                                                            Modify
                                                        </Button>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col sm={{size: 6}}>
                                                        {description}
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
                                                            Pais y Direccion
                                                        </h4>

                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/location`)}>
                                                            Modify
                                                        </Button>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col sm={{size: 6}}>
                                                        {country} {location}
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
                                                            Telefono
                                                        </h4>

                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/phone`)}>
                                                            Modify
                                                        </Button>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col sm={{size: 6}}>
                                                        {phone}
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
                                                            Foto
                                                        </h4>
                                                    </Col>
                                                    <Col sm={{size: 2}}>
                                                        <Button color={'warning'} onClick={() => route(`${path}/org/photo`)}>
                                                            Modify
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Media className="ml-3 w-25" object src = {`${PHOTOEND}${folderid}/${PROFILE}`} alt = "logo"/>
                                            </Container>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                        </Route>
            </Switch>
        </React.Fragment>
    );
}


export default OverviewOrg;
