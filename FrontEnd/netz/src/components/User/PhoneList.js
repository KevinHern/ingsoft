import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";

PhoneList.propTypes = {
    
};

function PhoneList(props) {
    return (
        <Row className={"mt-2"}>
            <Col sm={6}>
                <Input name="phone" type={"text"} id={"phone"+this.props.phone}  key = {"phone"+this.props.phone} onChange = {this.props.onChange} required/>
            </Col>
            <Col sm={6}>
                <Button  onClick={this.props.removeExtra}>Remove Phone</Button>
            </Col>
        </Row>
    );
}

export default PhoneList;