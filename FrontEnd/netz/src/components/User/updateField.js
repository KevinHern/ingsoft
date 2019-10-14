import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import {Label} from 'reactstrap';
import './caps.css';
import axios from 'axios';
import * as ROUTES from "../../Constants/routes";

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
        const{typeMode} = this.props.match.params;
        const {field} = this.props;
        console.log(this.props);
        console.log('field '+field);
        this.setState({field});
        this.setState({typeMode});
    }

   onSubmit = (e) => {
        e.preventDefault();
   };

    route = (goTo) =>{
        this.props.history.push(goTo);
    };



    render() {
        const{field, typeMode, value} = this.state;
        console.log(typeMode);
        console.log(field);



        return (

            <React.Fragment>
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
                        <Label className={'capitalize'} >{field}</Label>
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

export default UpdateFieldCom;
