import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import axios from 'axios';
import TitleModify from "./TitleModify";
import {withAuthentication} from '../../Session';
import {UPDATE} from "../../../Constants/Endpoint";
import PassCom from './PassCom';
import Spinners from '../../Wait'


const hidePass = [true, true, true];

class Password extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            pass: '',
            newPass1: "",
            newPass2: "",
            error: false,
            spinner: false,
            hidePass: [true, true, true]
        };
    }

    onSubmit = async () => {
        const {fireBase} = this.props;
        const {typeMode} = this.props.match.params;
        const {newPass1, pass, newPass2} = this.state;
        console.log(`${newPass1}  ${newPass2}`);
        if(pass === "") {
            this.setState({error: "Passwords actual  esta vacia"});
        }else{
            if(newPass1 === newPass2) {
                try{
                    if(newPass1 !== ''){
                        this.setState({spinner:true});
                        const update = await fireBase.doPasswordUpdate(newPass1, pass);
                        if(update){
                            console.log(update);
                            this.setState({error: update.message, spinner: false, hidePass});
                        }else{
                            console.log("Successful Change");
                            fireBase.token().then((uid) => {
                                axios({
                                    method: 'POST',
                                    url: UPDATE,
                                    data: {
                                        option: 'user',
                                        uid,
                                        field:'password',
                                        val: newPass1
                                    },
                                    headers: {'Content-Type': 'application/json'}
                                }).then((response) => {
                                    if(response.data.status){
                                        console.log("Backend updated");
                                        setTimeout(() => {
                                            this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                                        }, 1000);
                                    }else{
                                        // this.setState({error: "Error al cambiar en backend"});
                                        console.log(response);
                                        console.log("Failed backend update");
                                        setTimeout(() => {
                                            this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                                        }, 1000);
                                    }
                                });
                            })
                        }
                    }else{
                        console.log("Password nueva esta vacia");
                        this.setState({error: "Passwords nueva esta vacia", spinner: false, hidePass});
                    }

                }catch(error){
                    console.log(error);
                    this.setState({error: error.message, spinner: false, hidePass});
                }
            }else{
                //Use a tooltip
                this.setState({error: "Passwords son diferentes", spinner: false, hidePass});
                console.log("Passwords are different");
            }
        }
    };



    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    onChange= (e) => {
        this.setState({[e.target.name] : e.target.value})
    };

    toggleEye = (pass) => {
        const{hidePass} = this.state;
        hidePass[pass] = !hidePass[pass];
        this.setState({hidePass});
    };


    render() {
        const {typeMode} = this.props.match.params;
        const{error, spinner, hidePass, pass, newPass1, newPass2} = this.state;
        return (
            <React.Fragment>
                {
                    (spinner)?
                         <Spinners/>
                        :
                        <React.Fragment>
                            <TitleModify typeMode = {typeMode}/>
                            {
                                (error)?
                                    <Row className={'mt-5 justify-content-center'}>
                                        {error}
                                    </Row>
                                    : null
                            }
                            <Row className={'mt-5 justify-content-center'}>
                               <PassCom hidePass={hidePass[0]} label = {"Password Actual"} pass={pass} onChange={(this.onChange)} name = "pass" toggleHide={() => this.toggleEye(0)}/>
                            </Row>
                            <Row className={'mt-5 justify-content-center'}>
                                <PassCom hidePass={hidePass[1]} label = {"New Password"} pass={newPass1} onChange={this.onChange} name={"newPass1"} toggleHide={() => this.toggleEye(1)}/>
                            </Row>

                            <Row className={'mt-5 justify-content-center'}>
                                <PassCom hidePass={hidePass[2]} label = {"Retype New Password"} pass={newPass2} onChange={this.onChange} name={"newPass2"} toggleHide={() => this.toggleEye(2)}/>
                            </Row>
                            <Row className={'mt-5 justify-content-center'}>
                                <Col sm={{ size: 1 }}>
                                    <Button color={'primary'} onClick={this.onSubmit}>Modificar</Button>
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
                }
            </React.Fragment>

        );
    }
}
export  default withAuthentication(Password);