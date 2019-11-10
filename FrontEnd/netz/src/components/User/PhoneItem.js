import React from 'react';
import {Button, Col, Row, FormFeedback} from "reactstrap";
import Input from "reactstrap/es/Input";
import PropTypes from 'prop-types';



function PhoneItem(props) {
    return (
        <Row className={"mt-2"}>
            <Col sm={6}>
                <Input name="phone" type={"text"} data-phone ={props.idPhone} placeholder="0000-0000" onChange = {props.changePhone} value={props.phone} required/>
                <FormFeedback>No es un numero valido</FormFeedback>
            </Col>
            <Col sm={6}>
                <Button  onClick={ () => props.removePhone(props.idPhone)}>Remove Phone</Button>
            </Col>
        </Row>
    );
}

PhoneItem.propTypes = {
    idPhone:PropTypes.number,
    changePhone: PropTypes.func,
    phone: PropTypes.string,
    removePhone: PropTypes.func
};

export default PhoneItem;