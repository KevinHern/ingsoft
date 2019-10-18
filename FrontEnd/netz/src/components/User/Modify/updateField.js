import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import {Label} from 'reactstrap';
import './caps.css';
import axios from 'axios';
import * as ROUTES from "../../../Constants/routes";
import TitleModify from './TitleModify';
import {UPDATE} from '../../../Constants/Endpoint';
import {withAuthentication} from '../../Session'

class UpdateFieldCom extends Component {
    constructor(props){
        super(props);
        this.state = {
            field_value: {},
        };
    }

    componentDidMount() {
        const{inputs} = this.props;
        const field_value = {};
        // console.log(inputs);
        inputs.forEach((input) => {
          field_value[input.field] = input.value;
       });
        // console.log("did Mount");
        // console.log(field_value);
        this.setState({field_value});
    }


    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    update = () => {
        const {typeMode} = this.props.match.params;
        const {fireBase} = this.props;
        const {field_value} = this.state;
        const promise = fireBase.token();
        promise.then((uid) => {

                    // console.table(Object.keys(field_value));
                        axios({
                        method: 'POST',
                        url: UPDATE,
                        data: {
                            option: typeMode,
                            uid,
                            fields: [... Object.keys(field_value)],
                            vals: [... Object.values(field_value)]
                        },
                        headers: {'Content-Type': 'application/json'}
                    }).then( (response) => {
                            if(response.data['status']){
                                console.log(`${field_value} was stored successfully`);
                                this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                            }else{
                                console.log(response);
                                console.log(`${field_value} Could not be saved`);
                            }
                        }
                        );
            });
    };

    onChange = (e) => {
       const {field_value} = this.state;
       field_value[e.target.name] = e.target.value;
       // console.log(field_value);
       this.setState({field_value});
    };

    render() {
        const {typeMode} = this.props.match.params;
        const{inputs} = this.props;
        // console.log(inputs);
        const modifyFields = inputs.map(input =>
                <React.Fragment key={input.fieldName+input.value+input.type}>
                    <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label className={'capitalize'} >{(input.fieldName)? input.fieldName: input.field}</Label>
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
                            <Input type={input.type} name = {input.field} onChange ={this.onChange}/>
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
                        <Button color={'primary'} onClick={this.update}>Modificar</Button>
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
            </React.Fragment>

        );
    }
}

export default withAuthentication(UpdateFieldCom);
