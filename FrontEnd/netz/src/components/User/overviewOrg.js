import React, {Component} from 'react';
import Container from "reactstrap/es/Container";
import {Button, Col, Row} from "reactstrap";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
class OverviewOrg extends Component {
    render() {
        const{email, role, name, description, country, location, phone} = this.props;
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <h1>Informacion de Organizacion</h1>
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Nombre:
                                                </h4>
                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {name}
                                            </Col>
                                        </Row>
                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Email
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {email}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                   Clave
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                **********
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Roles
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {(role !== "0")?
                                                    (role === "1")?
                                                        <p> Emprendedor </p>
                                                        :
                                                        (role === "2")?
                                                            <p> Financista </p>
                                                            :
                                                            <div>
                                                                <p> Emprendedor  </p>
                                                                <p> Financista  </p>
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
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Descripcion
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {description}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Pais y Direccion
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {country} {location}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Telefono
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {phone}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}



export default OverviewOrg;
