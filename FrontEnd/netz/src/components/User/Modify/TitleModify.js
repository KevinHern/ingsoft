import React from 'react';
import {Row} from "reactstrap";

function TitleModify(props) {
    const{typeMode} = props;
    return (
        (typeMode === 'ind') ?
            <Row className={'mt-3 justify-content-center'}>

                <h1>Modificación en Individual</h1>
            </Row>

            :
            <Row className={'mt-3 justify-content-center'}>

                <h1>Modificación en Organización </h1>
            </Row>
    );
}

export default TitleModify;