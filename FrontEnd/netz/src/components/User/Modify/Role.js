import React, {Component} from 'react';
import {Button, Col, CustomInput, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import * as ROUTES from "../../../Constants/routes";
import TitleModify from "./TitleModify";
import axios from 'axios';
import {withAuthentication} from '../../Session';
import {UPDATE} from "../../../Constants/Endpoint";

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
        const{value} = this.props;
        //This might change later
        const edefault =  (value%2)===1;
        const fdefault =  (value%2)===0;
        const e = edefault;
        const f = fdefault;
        this.setState({e, f, fdefault, edefault})
    }

    update = () => {
        const{e, f}  = this.state;
        let val = 0;
        if(e) val+=1;
        if(f) val+=2;
        const{fireBase} = this.props;
        const promise =  fireBase.token();
        if(promise) {
            //console.log("vALUE = " +val);
            // promise.then((uid) => {
            //         axios({
            //             data: {
            //                 method: 'POST',
            //                 url: UPDATE,
            //                 option: "user",
            //                 uid,
            //                 field: "role",
            //                 val
            //             },
            //             headers: {'Content-Type': 'application/json'}
            //         }).then(response => {
            //             if(response.data['status']){
            //
            //             }else{
            //                 console.log("failed")
            //             }
            //         });
            // });
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
        const{eDefault, fdefault} = this.state;
        return (
            <React.Fragment>
                <TitleModify typeMode = {typeMode}/>
                <Row className={'mt-5 justify-content-center'}>
                    <Col sm={{ size: 1, offset: 2}}>
                        <h3 className={'capitalize'} >Roles</h3>
                    </Col>
                    <Col sm={5}>
                        <CustomInput type="checkbox" id="e" name="e" label="Emprendedor" key={"e"} value={1} onChange = {(e) => {this.onChange(e)}} defaultChecked={eDefault}/>
                        <CustomInput type="checkbox" id="f" name="f" label="Financista" key={"f"}  value={2} onChange = {(e) => {this.onChange(e)}} defaultChecked={fdefault}/>
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


export  default withAuthentication(Role);
