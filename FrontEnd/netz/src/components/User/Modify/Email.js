import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";

class Email extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
        };
    }


    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    render() {
        const {typeMode} = this.props.match.params;
        const{value} = this.props;
        return( <React.Fragment>

            <TitleModify typeMode = {typeMode}/>
            <Row className={'mt-5 justify-content-center'}>
                <Col sm={{ size: 1 }}>
                    <Label className={'capitalize'} >Email</Label>
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
                    <Label >Password</Label>
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
                    <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Regresar</Button>

                </Col>
            </Row>
        </React.Fragment>)
    }
}

export default Email;