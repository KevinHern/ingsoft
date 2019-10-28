import React from 'react';
import {FaCheckCircle, FaExclamationTriangle}  from 'react-icons/fa'
import {Container, Row, Col} from "reactstrap";
import { useParams} from "react-router-dom";
import './caps.css';

function StatusModify(props) {
    const{typeMode, status} =  useParams();
    console.log(status);
    return (
        <React.Fragment>
        {
            (status === 'success')?
            <Container>
                <Row className={"justify-content-center"}>
                    <Col sm={4}>
                        {/* 14*25 = 350
                        https://stackoverflow.com/questions/43768629/how-to-scale-large-font-awesome-icons-from-the-react-icons-package
                        */}
                        <FaCheckCircle color={'green'} size={350}/>
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
                        <Col sm={4}>
                            <FaExclamationTriangle color={'red'} size={350} />
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