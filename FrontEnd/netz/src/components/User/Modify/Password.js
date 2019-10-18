import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import axios from 'axios';
import TitleModify from "./TitleModify";
class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: '',
        };
    }

    route = (goTo) =>{
        this.props.history.push(goTo);
    };


    render() {
        const {typeMode} = this.props.match.params;
        return (
            <React.Fragment>
                <TitleModify typeMode = {typeMode}/>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label className={'capitalize'} >Password Actual</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input  type={'password'}/>
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >New Password</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input type={'text'}/>
                    </Col>
                </Row>

                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >Retype Password</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input type={'text'}/>
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Button color={'primary'}>Modificar</Button>
                    </Col>
                    <Col sm={{ size: 1 }}>
                        <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cancelar</Button>

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
export  default Password;