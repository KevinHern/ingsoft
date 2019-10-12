import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import {Label} from 'reactstrap';
import axios from 'axios';
import * as ROUTES from "../../Constants/routes";
import {Individual, Organizacion} from "./UserForm";

class UpdateFieldCom extends Component {
    constructor(props){
        super(props);
        this.state = {
            field: '',
            value: '',
            typeMode: ''
        };
    }

    componentDidMount() {
        const{field, value, typeMode} = this.props.match.params;
        this.setState({field, value, typeMode});
    }

   onSubmit = (e) => {
        e.preventDefault();
   };



    render() {
        const{field, value, typeMode} = this.state;
        console.log(typeMode);
        return (

            <React.Fragment>
                <Row>
                    <Col md={"12"}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"} onClick={()  => {this.route(ROUTES.HOME)}}>Principal</Button>
                                <Button color={"info"} onClick={() => {this.route(ROUTES.LISTIDEA)}}>Listar Ideas</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                {
                    (typeMode === 'ind') ?
                        <Row className={'mt-3 justify-content-center'}>

                            <h1>Modificación en Individual</h1>
                        </Row>

                    :
                        <Row className={'mt-3 justify-content-center'}>

                            <h1>Modificación en Organización </h1>
                        </Row>

                }
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >{field}</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input  type={'text'}  value={value} readOnly/>
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >Nuevo Valor</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input type={'text'}/>
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Button color={'primary'}>Modificar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default UpdateFieldCom;
