import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import axios from 'axios';
import TitleModify from "./TitleModify";
import {withAuthentication} from '../../Session';
import {UPDATE} from "../../../Constants/Endpoint";
class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: '',
            newPass1: "",
            newPass2: "",
            error: false
        };
    }

    onSubmit = async () => {
        const {fireBase, typeMode} = this.props;
        const {newPass1, pass, newPass2} = this.state;
        console.log(`${newPass1}  ${newPass2}`);
        if(newPass1 === newPass2) {
            try{
                if(newPass1 !== ''){
                    const update = await fireBase.doPasswordUpdate(newPass1, pass);
                    console.log("Successful Change");
                    // console.log(update)
                    if(update){
                        this.setState({error: update.message});
                    }else{
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
                                    this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                                }else{
                                    console.log(response);
                                    console.log("Failed backend update");
                                    this.setState({error: "Error al cambiar en backend"});
                                }
                            });
                        })
                    }
                }else{
                    console.log("Password esta vacio");
                    this.setState({error: "Passwords esta vacio"});
                }

            }catch(error){
                console.log(error);
                this.setState({error: error.message});
            }
        }else{
            //Use a tooltip
            this.setState({error: "Passwords son diferentes"});
            console.log("Passwords are different");
        }
    };



    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    onChange= (e) => {
        this.setState({[e.target.name] : e.target.value})
    };


    render() {
        const {typeMode} = this.props.match.params;
        const{error} = this.state;
        return (
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
                    <Col sm={{ size: 1 }}>
                        <Label className={'capitalize'} >Password Actual</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input name = "pass" type={'password'} onChange = {this.onChange} />
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >New Password</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input name = 'newPass1' type={'password'} onChange = {this.onChange}/>
                    </Col>
                </Row>

                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1 }}>
                        <Label >Retype Password</Label>
                    </Col>
                    <Col sm ={{ size: 3}}>
                        <Input name = 'newPass2' type={'password'} onChange = {this.onChange}/>
                    </Col>
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
        );
    }
}
export  default withAuthentication(Password);