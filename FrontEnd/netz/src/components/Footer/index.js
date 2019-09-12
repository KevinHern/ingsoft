import React from 'react';
import {Row, Col} from 'reactstrap';
import './Footer.css';
function Footer(props) {
    return (
        <footer className="fixed-bottom">
            <Row>
                <Col sm="12" md="12" lg="12">
                    <p className="text-md-center">NetZ</p>
                    <p className="text-md-center">&copy; 2019</p>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;