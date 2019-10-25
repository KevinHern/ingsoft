import React from 'react';
import {FaCheckCircle, FaExclamationTriangle}  from 'react-icons/fa'
import {Container, Row, Col} from "reactstrap";
import { useParams} from "react-router";

function StatusModify(props) {
    const{typeMode, status} =  useParams();
    console.log(status);
    return (
        <React.Fragment>
        {
            (status === 'success')?
            <Container>
                <Row className={"justify-content-center"}>
                    <Col sm={6}>
                        <FaCheckCircle color={'green'} size="xs"/>
                    </Col>
                </Row>
                <Row className={" mt-5 justify-content-center"}>
                    <Col sm={3}>
                        <h3> Modificación exitosa</h3>
                    </Col>
                </Row>
             </Container>:
                <Container>
                    <Row className={"justify-content-center"}>
                        <Col sm={6}>
                            <FaExclamationTriangle color={'red'} size={"lg"} />
                        </Col>
                    </Row>
                    <Row className={" mt-5 justify-content-center"}>
                        <Col sm={3}>
                            <h3> Modificación Fallida</h3>
                        </Col>
                    </Row>
                </Container>
        }
        {/*<Button onClick={}></Button>*/}
        </React.Fragment>
    );
}

export default StatusModify;