import React, {Component} from 'react';

import {Button, ButtonGroup, ButtonToolbar, Col, Row, FormGroup, Label, Input} from "reactstrap";
import Form from "reactstrap/es/Form";
import Container from "reactstrap/es/Container";
import axios from 'axios';
import {GETUSER} from "../../Constants/Endpoint";


class OverviewInd extends Component {

    constructor(props){
        super(props);
        this.state= {
            name: 'Jose',
            lastName: 'Jimenez',
            nat: 'Guatemala',
            birth: '02/09/2018',
            bio: 'adfa',
            org: 'asdfa',
            fetched: false
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps);
        // console.log('here');
        const {fireBase} = this.props;
        const {fetched} = this.state;
        if(!fetched){
            fireBase.token().then((response) => {
                console.log(response);
                axios({
                    method: 'POST',
                    url: GETUSER,
                    data: {uid: response},
                    headers: {'Content-Type': 'application/json'}
                }).then((response) => {
                    console.log(response.data);
                    // this.set
                    this.setState({fetched:true})
                });
            })
        }
    }

    componentDidMount() {
        const {fireBase} = this.props;
        const {authUser} = this.props;
        console.log(fireBase);
        if(authUser != null) {
            fireBase.token().then((response) => {
                axios({
                    method: 'POST',
                    url: GETUSER,
                    data: {uid: response},
                    headers: {'Content-Type': 'application/json'}
                }).then((response) => {
                    console.log(response.data);
                });

            })
        }
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(e.target);
    // };


    render() {
        const {name, lastName, nat, birth, bio, org} = this.state;
        // const {authUser} = this.props;

        return (
            <React.Fragment>
                <Row>
                    <Col md={"12"}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"}>Principal</Button>
                                <Button color={"info"}>Listar Ideas</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row> Primer Nombre</Row>
                            <Row> {name}</Row>
                        </Container>
                    </Col>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Segundo Nombre</Row>
                            <Row> {name}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Primer Apellido</Row>
                            <Row> {lastName}</Row>
                        </Container>
                    </Col>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Segundo Apellido</Row>
                            <Row> {lastName}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Nacionalidad</Row>
                            <Row> {nat}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Fecha de Nacimiento</Row>
                            <Row> {birth}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Biografia</Row>
                            <Row> {bio}</Row>
                        </Container>
                    </Col>
                </Row>
                {
                    (org)? <Row>
                        <Col sm={{ size: 'auto', offset: 3 }}>
                            <Container className={"justify-content-center"} >
                                <Row>Organización afiliada</Row>
                                <Row> {org}</Row>
                            </Container>
                        </Col>
                    </Row>: null

                }
            </React.Fragment>
        );
    }
}

export default OverviewInd;

//
// {/*<Form inline className={"pl-5 mb-3 justify-content-center"}  onSubmit={this.handleSubmit}>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="exampleEmail" className={"pr-5"}>Email</Label>*/}
// {/*        <Input type="email" name="email" id="exampleEmail" placeholder="Email" />*/}
// {/*        <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>*/}
// {/*    </FormGroup>*/}
// {/*</Form>*/}
// {/*<Form inline  className={"pl-5 mb-3 justify-content-center"} onSubmit={this.handleSubmit}>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="desc"  className={"pr-5"}>Desc</Label>*/}
// {/*        <Input type="textarea" name="email" id="exampleEmail" placeholder="Email"  />*/}
// {/*        <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>*/}
// {/*    </FormGroup>*/}
// {/*</Form>*/}
// {/*<Form inline className={"pl-5 mb-3 justify-content-center"}  onSubmit={this.handleSubmit} >*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="exampleEmail"  className={"pr-5"}>Email</Label>*/}
// {/*        <Input type="email" name="email" id="exampleEmail" placeholder="Email" />*/}
// {/*        <Button color={'warning'} className={"ml-4"} type={"submit"}>Editar</Button>*/}
// {/*    </FormGroup>*/}
// {/*</Form>*/}