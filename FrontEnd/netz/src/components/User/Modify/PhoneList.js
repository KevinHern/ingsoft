import React, {Component} from 'react';
import PhoneItem from "../PhoneItem";
import TitleModify from "./TitleModify";
import {Button, Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import * as ROUTES from "../../../Constants/routes";
import {UPDATE_PHONE} from '../../../Constants/Endpoint';
import axios from 'axios';
import {withAuthentication} from '../../Session';

class PhoneList extends Component {

    constructor(props){
        super(props);
        this.state = {
            phoneList:[],
            phoneOrg: ''
        };
    }

    componentDidMount() {
        const{value} = this.props;
        // console.log(value);
        this.setState({phoneList:value});
    }



    addExtra = () => {
        let {phoneList} = this.state;
        phoneList.push("");
        // console.log(phoneList);
        this.setState({phoneList});
    };

    removeExtra = (index) => {
        let {phoneList} = this.state;
        console.log(index);
        console.log(phoneList.splice(index, 1));
        console.log(phoneList);
        this.setState({phoneList});
    };

    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    onChangeOrg = (e) => {
        this.setState({phoneOrg: e.target.value})
    };

    onChange = (e) => {
            let {phoneList} = this.state;
            let index = e.target.dataset['phone'];
            console.log(phoneList);
            phoneList[index]= e.target.value;
            this.setState({phoneList});
    };

    update = () => {
        const {typeMode} = this.props.match.params;
        const {fireBase} = this.props;
        const {phoneOrg, phoneList} = this.state;
        const promise = fireBase.token();
        let phone = {};
        if(phoneOrg !== '') {
            phone =  [{"phone0" : {number: phoneOrg}}];
        }else{
             phone = phoneList.map((phone, index) => {
                return {["phone"+index] : {number:phone}};
            });
        }
        console.log(phone);
        if(promise){
            promise.then((uid) => {
                console.log(phone);
                axios({
                    url: UPDATE_PHONE,
                    method: 'post',
                    data: {
                       uid,
                       phone
                    },
                    headers: { 'Content-Type': 'application/json'},
                }).then((response) => {
                    if(response.data['status']){
                        this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                    }else{
                        console.log(response);
                        this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                    }
                })
            })
        }
    };

    render() {
        let {phoneList} = this.state;
        const{value} = this.props;
        let {typeMode} = this.props.match.params;
        const {allowExtra, field} = this.props;

        phoneList = phoneList.map((phone, index) => {
                if(index === 0) {
                    return <Row key = {index} >
                        <Col sm={6}>
                            <Input name="phone" type={"text"} id="phone" defaultValue = {phone} data-phone = {0} onChange = {this.onChange} required/>
                        </Col>
                        <Col sm={6}>
                            <Button  onClick={this.addExtra}>Extra Phone</Button>
                        </Col>
                    </Row>;
                }else{
                    return <PhoneItem  className={'mt-5 justify-content-center'} key = {index} phone = {phone} idPhone = {index} changePhone = {this.onChange} removePhone = {this.removeExtra}/>
                }
            }
        );
        return (
            <div>
                <TitleModify typeMode = {typeMode}/>
                {(allowExtra)?
                    <Row className={'mt-5 justify-content-center'} >
                        <Col sm={4}>
                            <Container>
                                <div>{phoneList}</div>
                            </Container>
                        </Col>
                    </Row>
                    :
                    <React.Fragment>
                        <Row className={'mt-5 justify-content-center'}>
                            <Col sm={{ size: 1 }}>
                                <Label className={'capitalize'} >{field}</Label>
                            </Col>
                            <Col sm ={{ size: 3}}>
                                <Input  type={'text'}  defaultValue={value[0]} readOnly/>
                            </Col>
                        </Row>
                        <Row className={'mt-5 justify-content-center'}>
                            <Col sm={{ size: 1 }}>
                                <Label >Nuevo Valor</Label>
                            </Col>
                            <Col sm ={{ size: 3}}>
                                <Input type={'text'} name={'phoneOrg'} onChange ={this.onChangeOrg}/>
                            </Col>
                        </Row>
                    </React.Fragment>
                }

                <Row className={'mt-5 justify-content-center'} >
                    <Col sm={{ size: 1 }}>
                        <Button color={'primary'} onClick={this.update}>Modificar</Button>
                    </Col>
                    <Col sm={{ size: 1 }}>
                        <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cancelar</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}


export  default withAuthentication(PhoneList);


