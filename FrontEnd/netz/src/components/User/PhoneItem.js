import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";

// PhoneItem.propTypes = {
//
// };

function PhoneItem(props) {
    return (
        <Row className={"mt-2"}>
            <Col sm={6}>
                <Input name="phone" type={"text"} data-phone ={props.idPhone} onChange = {props.changePhone} value={props.phone} required/>
            </Col>
            <Col sm={6}>
                <Button  onClick={ () => props.removePhone(props.idPhone)}>Remove Phone</Button>
            </Col>
        </Row>
    );
}

export default PhoneItem;