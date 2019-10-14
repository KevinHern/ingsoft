import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import {Label} from 'reactstrap';
import './caps.css';
import axios from 'axios';
import * as ROUTES from "../../../Constants/routes";
import TitleModify from './TitleModify';

class UpdateFieldCom extends Component {
    constructor(props){
        super(props);
        this.state = {
            field: '',
            value: '',
        };
    }

   onSubmit = (e) => {
        e.preventDefault();
   };

    route = (goTo) =>{
        this.props.history.push(goTo);
    };



    render() {
        const {typeMode} = this.props.match.params;
        const{inputs} = this.props;
        // console.log(inputs);
        const modifyFields = inputs.map(input =>
                <React.Fragment key={input}>
                    <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label className={'capitalize'} >{input.field}</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input  type={input.type}  value={input.value} readOnly/>
                    </Col>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <Col sm={{ size: 1 }}>
                            <Label >Nuevo Valor</Label>
                        </Col>
                        <Col sm ={{ size: 3}}>
                            <Input type={input.type}></Input>
                        </Col>
                    </Row>
                </React.Fragment>
        );
        return (
            <React.Fragment>
                <TitleModify typeMode = {typeMode}/>
                {
                    modifyFields
                }
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
            </React.Fragment>

        );
    }
}

export default UpdateFieldCom;
