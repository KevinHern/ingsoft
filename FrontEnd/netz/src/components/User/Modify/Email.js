import React, {Component} from 'react';
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";
import {withAuthentication} from '../../Session';
import axios from 'axios';
import {UPDATE} from "../../../Constants/Endpoint";
import firebase from "firebase";
import Wait from "../../Wait/Wait";
import Spinners from "../../Wait";
import {PassCom} from "./index";

class Email extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            newEmail: "",
            pass: "",
            error: false,
            wait: false,
            hide: true,
            validEmail: false
        };
    }


    toggleEye = () => {
        const{hide} = this.state;
        this.setState({hide: !hide})
    };



     onSubmit = async () => {
        const {fireBase, route} = this.props;
        const {typeMode} = this.props.match.params;
        const {newEmail, pass, validEmail} = this.state;
        try{
            if(newEmail !== ''){
                if(pass === '') {
                    this.setState({error: "Password actual esta vacio", wait:false, hide:true});
                    return;
                }
                if(!validEmail){
                    this.setState({error: "Email no es valido", wait:false, hide:true});
                    return;
                }
                this.setState({wait: true});
                const update = await fireBase.doEmailUpdate(newEmail, pass);
                if(update){
                    console.log(update);
                    setTimeout(() => {
                        this.setState({error: update.message, wait: false,  hide:true});
                    }, 500);
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
                                    console.log("Backend updated");
                                    setTimeout(() => {
                                        this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                                    }, 1000);
                                }else{
                                    console.log(response);
                                    setTimeout(() => {
                                        this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                                    }, 1000);
                                }
                            });
                        })
                }
            }else{
                this.setState({error: "Nuevo Email esta vacio", wait:false, hide:true});
            }
        }catch(error){
            this.setState({error: error.message, wait:false, hide:true});
        }

    };

    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    onChange= (e) => {
      if(e.target.name === 'newEmail') {
          if( /\S+@\S+\.\S+/.test(e.target.value)){
              this.setState({[e.target.name] : e.target.value, validEmail:true});
          }else{
              this.setState({[e.target.name] : e.target.value, validEmail:false});
          }
      }else{
          this.setState({[e.target.name] : e.target.value})
      }
    };

    render() {
        const {typeMode} = this.props.match.params;
        const{value} = this.props;
        const{error, wait, hide, newEmail, pass} = this.state;
        return( <React.Fragment>
            {(wait)?
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
                        <Col sm={{ size: 1 }}>
                            <Label className={'capitalize'} >Email Actual</Label>
                        </Col>
                        <Col sm ={{ size: 4}}>
                            <Input  type={'email'}  defaultValue={value} readOnly/>
                        </Col>
                        <Col sm ={{ size: 1}}>
                        </Col>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <Col sm={{ size: 1 }}>
                            <Label >Nuevo Email</Label>
                        </Col>
                        <Col sm ={{ size: 4}}>
                            <Input type={'email'} name = 'newEmail' onChange={this.onChange} defaultValue={newEmail}/>
                        </Col>
                        <Col sm ={{ size: 1}}>
                        </Col>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <PassCom  hidePass={hide}  onChange ={this.onChange} pass={pass} toggleHide = {this.toggleEye} name = {"pass"} label = {"Password actual"}/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <Col sm={{ size: 1 }}>
                            <Button color={'primary'} onClick={this.onSubmit}>Modificar</Button>
                        </Col>
                        <Col sm={{ size: 1 }}>
                            <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cancelar</Button>
                        </Col>
                    </Row>
                </React.Fragment>
            }
        </React.Fragment>)
    }
}

export default withAuthentication(Email);