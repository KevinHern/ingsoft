import React, {Component} from 'react';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, Col, CustomInput, Media, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";

class CreateIdea extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }



    onSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}}>.
                            <h1>Crear Idea</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}}>.
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup row>
                                    <Label sm={2} className={"pr-0"}>
                                        Titulo
                                    </Label>
                                    <Col sm={8}>
                                        <Input name="title" type={"text"} id="name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Descripción
                                    </Label>
                                    <Col sm={8}>
                                        <Input name="title" type={"textarea"} id="name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Categoría
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="select" name="select" id="exampleSelect">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className={"justify-content-md-center mt-3"}>
                                    <Button color="primary" onClick={this.props.onClick}>{this.props.message}</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default CreateIdea;