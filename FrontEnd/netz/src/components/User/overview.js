import React, {Component} from 'react';

import {Button, ButtonGroup, ButtonToolbar, Col, Row, FormGroup, Label, Input} from "reactstrap";
import Form from "reactstrap/es/Form";
import Container from "reactstrap/es/Container";

class Overview extends Component {

    constructor(props){
        super(props);
        this.state= {

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
    };


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={"12"}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"}>Principal</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                        <Form inline className={"pl-5 mb-3 justify-content-center"}  onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail" className={"pr-5"}>Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>
                            </FormGroup>
                        </Form>
                        <Form inline  className={"pl-5 mb-3 justify-content-center"} onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="desc"  className={"pr-5"}>Desc</Label>
                                <Input type="textarea" name="email" id="exampleEmail" placeholder="Email"  />
                                <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>
                            </FormGroup>
                        </Form>
                        <Form inline className={"pl-5 mb-3 justify-content-center"}  onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="exampleEmail"  className={"pr-5"}>Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                                <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Overview;
