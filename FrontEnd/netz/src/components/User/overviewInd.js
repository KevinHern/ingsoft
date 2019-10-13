import React, {Component} from 'react';

import {Button, ButtonGroup, ButtonToolbar, Col, Row, FormGroup, Label, Input} from "reactstrap";
import Form from "reactstrap/es/Form";
import Container from "reactstrap/es/Container";
import axios from 'axios';
import {GETUSER} from "../../Constants/Endpoint";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";


class OverviewInd extends Component {

    constructor(props){
        super(props);
        this.state= {
            firstname: '',
            lastname: '',
            nationality: '',
            birthdate: '',
            biography: '',
            organization: '',
            role: null,
            email: '',
            fetched: false
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {fireBase} = this.props;
    //     const {fetched} = this.state;
    //     if(!fetched){
    //         fireBase.token().then((response) => {
    //             console.log(response);
    //             axios({
    //                 method: 'POST',
    //                 url: GETUSER,
    //                 data: {uid: response},
    //                 headers: {'Content-Type': 'application/json'}
    //             }).then((response) => {
    //                 console.log(response.data);
    //                 this.setState({...response.data,  fetched:true})
    //             });
    //         })
    //     }
    // }

    componentDidMount() {
        // const {fireBase} = this.props;
        // // const {authUser} = this.props;
        // console.log(fireBase);
        // if(authUser != null) {
        //     fireBase.token().then((response) => {
        //         axios({
        //             method: 'POST',
        //             url: GETUSER,
        //             data: {uid: response},
        //             headers: {'Content-Type': 'application/json'}
        //         }).then((response) => {
        //             console.log(response.data);
        //         });
        //
        //     })
        // }
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(e.target);
    // };

    route = (goTo) =>{
        this.props.history.push(goTo);
    };


    render() {
        const {firstname, lastname, nationality, birthdate, biography, organization} = this.props;
        // const {authUser} = this.props;
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <h1>Informacion de Usuario</h1>
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Nombre:
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                 {firstname} {lastname}
                                            </Col>
                                        </Row>
                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                     Nacionalidad
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {nationality}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Fecha de nacimiento
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {birthdate}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Container className={"justify-content-center"} >
                                        <Row>
                                            <Col sm={{ size: 9}}>
                                                <h4>
                                                    Biografia
                                                </h4>

                                            </Col>
                                            <Col  sm={{ size: 2}}>
                                                <Button color={'warning'}>
                                                    Modify
                                                </Button>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={{ size: 6}}>
                                                {biography}
                                            </Col>
                                        </Row>

                                    </Container>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    {
                        (organization)?
                            <Row>
                                <Col sm={{ size: 6, offset: 3 }}>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <Container className={"justify-content-center"} >
                                                <Row>
                                                    <Col sm={{ size: 9}}>
                                                        <h4>
                                                            Organización afiliada
                                                        </h4>
                                                    </Col>
                                                    <Col  sm={{ size: 2}}>
                                                        <Button color={'warning'}>
                                                            Modify
                                                        </Button>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col sm={{ size: 6}}>
                                                        {organization}
                                                    </Col>
                                                </Row>

                                            </Container>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                            : null
                    }
                </Container>

            </React.Fragment>
        );
    }
}

export default OverviewInd;

