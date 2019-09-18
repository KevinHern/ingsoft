import React from 'react';
import {Form, Col, Row, FormText, Button, ButtonGroup, ButtonToolbar, Table} from 'reactstrap'
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Paginator from "../Paginator";
import { FaSearch } from 'react-icons/fa';
import CreateIdea from './create';
import Desc from './desc';

function ListIdea() {
    return (
        <React.Fragment>
                <Row className={"justify-content-end"}>
                    <Col sm={4} >
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"}>Crear Idea</Button>
                                <Button color={"info"}>Principal</Button>
                                <Button color={"info"}>Cuenta</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center mt-3"}>
                    <Table hover responsive={true} size={""}>
                        <thead>
                                <tr>
                                    <td>
                                        Ideas
                                    </td>
                                    <td colSpan={2}>
                                        <Form inline className={"justify-content-md-end"}>
                                            <FormGroup >
                                                <Input type="text" name="search" id="search" placeholder="Buscar" />
                                                <Button type={"submit"}>
                                                    <FaSearch/>
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    </td>
                                </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope = "row">1</th>
                                <td>One</td>
                                <td>
                                    <Button color={"link"}>
                                        ShowDetails
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope = "row">1</th>
                                <td>One</td>
                                <td>
                                    <Button color={"link"}>
                                        ShowDetails
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope = "row">1</th>
                                <td>One</td>
                                <td>
                                    <Button color={"link"}>
                                        ShowDetails
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope = "row">1</th>
                                <td>One</td>
                                <td>
                                    <Button color={"link"}>
                                        ShowDetails
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                <Row className={"justify-content-md-center"}>
                    <Paginator page={9}/>
                </Row>
        </React.Fragment>
    )
}

export {CreateIdea, ListIdea, Desc};

            /* {(props.create)? } */