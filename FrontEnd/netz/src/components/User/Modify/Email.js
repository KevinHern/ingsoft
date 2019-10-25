import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";
import {withAuthentication} from '../../Session';
import axios from 'axios';
import {UPDATE} from "../../../Constants/Endpoint";
import firebase from "firebase";

class Email extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            newEmail: "",
            pass: "",
            error: false
        };
    }



     onSubmit = async () => {
        const {fireBase} = this.props;
        const {newEmail, pass} = this.state;
        try{
            if(newEmail !== ''){
                const update = await fireBase.doEmailUpdate(newEmail, pass);
                if(update){
                    console.log(update);
                    this.setState({error: update.message});
                }else{
                    console.log("Successful Change");
                        fireBase.token().then((uid) => {
                            axios({
                                method: 'POST',
                                url: UPDATE,
                                data: {
                                    option: 'user',
                                    uid,
                                    field:'email',
                                    val: newEmail
                                },
                                headers: {'Content-Type': 'application/json'}
                            }).then((response) => {
                                if(response.data.status){
                                    console.log("Backend updated")
                                }else{
                                    console.log(response);
                                    console.log("Failed backend update");
                                }
                            });
                        })
                }
            }else{
                console.log("Email esta vacio");
            }

        }catch(error){
            console.log(error);
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
        const{value} = this.props;
        const{error} = this.state;
        return( <React.Fragment>

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
                    <Label className={'capitalize'} >Email</Label>
                </Col>
                <Col sm ={{ size: 3}}>
                    <Input  type={'email'}  defaultValue={value} readOnly/>
                </Col>
            </Row>
            <Row className={'mt-5 justify-content-center'}>
                <Col sm={{ size: 1 }}>
                    <Label >Nuevo Valor</Label>
                </Col>
                <Col sm ={{ size: 3}}>
                    <Input type={'email'} name = 'newEmail' onChange={this.onChange}/>
                </Col>
            </Row>
            <Row className={'mt-5 justify-content-center'}>
                <Col sm={{ size: 1 }}>
                    <Label >Password</Label>
                </Col>
                <Col sm ={{ size: 3}}>
                    <Input type={'password'} name={"pass"} onChange={this.onChange}/>
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
        </React.Fragment>)
    }
}

export default withAuthentication(Email);