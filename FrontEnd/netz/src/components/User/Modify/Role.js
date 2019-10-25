import React, {Component} from 'react';
import {Button, Col, CustomInput, Label, Row, Form} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";
import axios from 'axios';
import {withAuthentication} from '../../Session';
import {UPDATE} from "../../../Constants/Endpoint";
import Container from "reactstrap/es/Container";

class Role extends Component {

    constructor(props) {
        super(props);
        this.state = {
            e: false,
            f: false,
        };
    }

    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    componentDidMount() {
        let{value} = this.props;
        //This might change later
        console.log(value);
        value = parseInt(value);
        this.setDefaults(value);
    }

    setDefaults = (value) => {
        if(value){
            let e =  false;
            let f = false;
            switch(value){
                case 1:
                    e = true;
                    break;
                case 2:
                    f = true;
                    break;
                case 3:
                    e = true;
                    f = true;
                    break;
            }
            console.log(value);
            console.log(`e: ${e} f: ${f}`);
            this.setState({e, f});
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const{value} = prevProps;
        if(!value){
            this.setDefaults(parseInt(this.props.value));
        }
    }

    update = () => {
        const{e, f}  = this.state;
        const {typeMode} = this.props.match.params;
        let val = 0;
        if(e) val+=1;
        if(f) val+=2;
        const{fireBase} = this.props;
        const promise =  fireBase.token();
        console.log(`val: ${val}`);
        if(promise) {
            promise.then((uid) => {
                    axios({
                        method: 'POST',
                        url: UPDATE,
                        data: {
                            option: "user",
                            uid,
                            field: "role",
                            val
                        },
                        headers: {'Content-Type': 'application/json'}
                    }).then(response => {
                        console.log(response);
                        if(response.data['status']){
                            console.log("Backend updated");
                            this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                        }else{
                            console.log("Failed backend update");
                            this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                        }
                    });
            });
        }
     };

    onChange = (event) =>{
        const value = this.state[event.target.name];
        console.log(`${event.target.name} ${value}`);
        console.log("change");
        this.setState({[event.target.name] :  !value})
    };


    render() {
        const {typeMode} = this.props.match.params;
        const{e, f} = this.state;
        return (
            <React.Fragment>
                <TitleModify typeMode = {typeMode}/>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm = {12}>
                        <Form>
                            <Container fluid>
                                    <Row className={'mt-5 justify-content-center'}>
                                        <Col sm={{ size: 1, offset: 2}}>
                                            <h3 className={'capitalize'} >Roles</h3>
                                        </Col>
                                        <Col sm={5}>
                                            <CustomInput type="checkbox" id="e" name="e" label="Emprendedor" key={"e"} value={1} onChange = {(e) => {this.onChange(e)}} checked={e}/>
                                            <CustomInput type="checkbox" id="f" name="f" label="Financista" key={"f"}  value={2} onChange = {(e) => {this.onChange(e)}} checked={f}/>
                                        </Col>
                                    </Row>
                                    <Row className={'mt-5 justify-content-center'}>
                                            <Col sm={{ size: 1 }}>
                                                <Button color={'primary'} onClick={this.update}>Modificar</Button>
                                            </Col>
                                            <Col sm={{ size: 1 }}>
                                                <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cancelar</Button>
                                            </Col>
                                    </Row>
                            </Container>
                        </Form>
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


export  default withAuthentication(Role);
