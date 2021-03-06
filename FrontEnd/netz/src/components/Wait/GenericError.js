import React from 'react';
import {Col, Row} from "reactstrap";
import {FaExclamationTriangle} from "react-icons/fa";
import PropTypes from 'prop-types';


function GenericError(props) {
    return (
        <React.Fragment>
            <Row className={"justify-content-center"}>
                <Col sm={3}>
                    <FaExclamationTriangle color={'red'} size={350} />
                </Col>
            </Row>
            <Row className={"justify-content-center"}>
                <Col sm={3}>
                    {props.error}
                </Col>
            </Row>
        </React.Fragment>
    );
}

GenericError.propTypes = {
    error:PropTypes.string
};
export default GenericError;