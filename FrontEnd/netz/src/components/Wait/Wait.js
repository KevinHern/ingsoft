import React from 'react';
import {Spinner} from 'reactstrap';

function Wait(props) {
    return (
        <React.Fragment>
            <Spinner    style={{ width: '5rem', height: '5rem' }}  color="primary" />
            <Spinner  style={{ width: '5rem', height: '5rem' }} color="secondary" />
            <Spinner style={{ width: '5rem', height: '5rem' }}  color="success" />
            <Spinner style={{ width: '5rem', height: '5rem' }} color="danger" />
            <Spinner style={{ width: '5rem', height: '5rem' }}   color="warning" />
            <Spinner  style={{ width: '5rem', height: '5rem' }}  color="info" />
            <Spinner  style={{ width: '5rem', height: '5rem' }}  color="light" />
            <Spinner  style={{ width: '5rem', height: '5rem' }}  color="dark" />
        </React.Fragment>
    );
}

export default Wait;