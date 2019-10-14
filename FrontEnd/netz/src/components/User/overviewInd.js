import React from 'react';

import {Button, Col, Row} from "reactstrap";
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Container from "reactstrap/es/Container";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {Password, PhoneList, Email, Role, UpdateFieldCom} from './Modify/';


function OverviewInd(props) {
    const {firstname, lastname, nationality, birthdate, biography, organization, email, role, phones, route} = props;
    // console.log(phones)
    // const {field} = this.state;
    // const {authUser} = this.props;
    let {path} = useRouteMatch();
    // console.log(path);
    const phoneList = Object.values(phones).map((phone) =>
        <div key={phone}>{phone}</div>
    );
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${path}/:typeMode/name`} render = {(props) =>
                    <UpdateFieldCom {...props} inputs = {[{field: 'Nombre', type : 'text', value : firstname}, {field: 'Apellido', type : 'text', value : lastname}]} />}/>
                <Route path={`${path}/:typeMode/email`} render = {(props) =>
                    <Email  {...props} field ={'Email'}  value={email} />}/>
                <Route path={`${path}/:typeMode/password`} render = {(props) =>
                    <Password {...props} field ={'Clave'}/>}/>
                <Route path={`${path}/:typeMode/role`} render = {(props) =>
                    <Role {...props} field ={'Role'}  value={role} />}/>
                <Route path={`${path}/:typeMode/phone`} render = {(props) =>
                    <PhoneList {...props} field ={'Telefono'}  value={Object.values(phones)} />}/>
                <Route path={`${path}/:typeMode/nat`} render = {(props) =>
                    <UpdateFieldCom {...props} inputs = {[{field: 'Nacionalidad', type : 'text', value : nationality}]} />}/>
                <Route path={`${path}/:typeMode/birth`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{field: 'Fecha de nacimiento', type : 'date', value : birthdate}]} />}/>
                <Route path={`${path}/:typeMode/bio`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{field: 'Biografía', type : 'textarea', value : biography}]} />}/>
                <Route path={`${path}/:typeMode/aff`} render = {(props) =>
                    <UpdateFieldCom {...props}  inputs = {[{field: 'Organizacion Afiliada', type : 'text', value : organization}]} />}/>
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
                    </Container>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default OverviewInd;

