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
import Spinners from "../../Wait";

class UpdateFieldCom extends Component {
    constructor(props){
        super(props);
        this.state = {
            field_value: {},
            spinner: false,
            disabled: true
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
                 this.setState({spinner: true});
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
                                setTimeout(() => {
                                    this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                                }, 1500);
                            }else{
                                console.log(response);
                                console.log(`${field_value} Could not be saved`);
                                setTimeout(() => {
                                    this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                                 }, 1500);
                            }
                        });
            });
    };

    onChange = (e) => {
       const {field_value} = this.state;
       let disabled = true;
       if(e.target.value.trim() !== '') disabled = false;
       field_value[e.target.name] = e.target.value;
        const empty = Object.values(field_value).filter((value) => value.trim() === '');
        if(empty.length) disabled = true;
       // console.log(field_value);
       this.setState({field_value, disabled});
    };

    render() {
        const {typeMode} = this.props.match.params;
        const{inputs} = this.props;
        const{spinner, disabled} = this.state;
        // console.log(inputs);
        const modifyFields = inputs.map(input =>
                <React.Fragment key={input.fieldName+input.value+input.type}>
                    {/*<Row className={'mt-5 justify-content-center'}>*/}
                    {/*<Col sm={{ size: 1 }}>*/}
                    {/*    <Label className={'capitalize'} >{(input.fieldName)? input.fieldName: input.field} Actual</Label>*/}
                    {/*</Col>*/}
                    {/*<Col sm ={{ size: 3}}>*/}
                    {/*    <Input  type={input.type}  value={input.value} readOnly/>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    <Row className={'mt-5 justify-content-center'}>
                        <Col sm={{ size: 1 }}>
                            <Label>{(input.fieldName)? input.fieldName: input.field} </Label>
                        </Col>
                        <Col sm ={{ size: 3}}>
                            <Input type={input.type} name = {input.field} defaultValue = {input.value} onChange ={this.onChange}/>
                        </Col>
                    </Row>
                </React.Fragment>
        );
        return (
            <React.Fragment>
            {(!spinner) ?
                <React.Fragment>
                    <TitleModify typeMode={typeMode}/>
                    {
                        modifyFields
                    }
                    <Row className={'mt-5 justify-content-center'}>
                        <Col sm={{size: 1}}>
                            <Button color={'primary'} onClick={this.update} disabled={disabled}>Modificar</Button>
                        </Col>
                        <Col sm={{size: 1}}>
                            <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cancelar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                        </Col>
                    </Row>
                </React.Fragment>
                :
               <Spinners/>
            }
            </React.Fragment>
        );
    }
}

export default withAuthentication(UpdateFieldCom);
