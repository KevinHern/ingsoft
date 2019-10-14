import React, {Component} from 'react';
import {Button, Col, CustomInput, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";

class Role extends Component {

    constructor(props) {
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
        return (
            <React.Fragment>
                <TitleModify typeMode = {typeMode}/>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1, offset: 2}}>
                        <h3 className={'capitalize'} >Roles</h3>
                    </Col>
                    <Col sm={5}>
                        <CustomInput type="checkbox" id="e1" name="e1" label="Emprendedor" key={"e1"} value={1} onChange = {this.onChange}/>
                        <CustomInput type="checkbox" id="f1" name="f1" label="Financista" key={"f1"}  value={2} onChange = {this.onChange}/>
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


export  default Role;
