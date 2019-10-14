import React, {Component} from 'react';
import PhoneItem from "../PhoneItem";
import TitleModify from "./TitleModify";
import {Button, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import * as ROUTES from "../../../Constants/routes";

class PhoneList extends Component {

    constructor(props){
        super(props);
        this.state = {
            phoneList:[]
        };
    }

    componentDidMount() {
        const{value} = this.props;
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

    render() {
        let {phoneList} = this.state;
        let {typeMode} = this.props.match.params;
        console.log(typeMode);

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
                <Row className={'mt-5 justify-content-center'} >
                    <Col sm={4}>
                        <Container>
                            {phoneList}
                        </Container>
                    </Col>
                </Row>
                <Row className={'mt-5 justify-content-center'} >
                    <Col sm={{ size: 1 }}>
                        <Button color={'primary'}>Modificar</Button>
                    </Col>
                    <Col sm={{ size: 1 }}>
                        <Button color={"danger"} onClick={() => this.route(ROUTES.OVERVIEW)}>Regresar</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}


export  default PhoneList;