
import Wait from './Wait.js'


import React from 'react';
import {Row} from "reactstrap";

function Spinners(props) {
    const{noRows} = props;
    return (
        <React.Fragment>
            {(noRows) ?
                <Row className={'justify-content-center mt-5 mb-5 align-items-center'}>
                    <Wait/>
                </Row>
                :
                <React.Fragment>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                    <Row className={'justify-content-center align-items-center'}>
                        <Wait/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                    <Row className={'mt-5 justify-content-center'}>
                        <br/>
                    </Row>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default Spinners;