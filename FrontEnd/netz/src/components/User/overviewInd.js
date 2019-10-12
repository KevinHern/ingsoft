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
                <Row>
                    <Col sm={{ size: 6, offset: 3 }}>
                             Primer Nombre
                    </Col>
                    <Col sm={{ size: 6, offset: 3 }}>
                            {firstname}
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Primer Apellido</Row>
                            <Row> {lastname}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Nacionalidad</Row>
                            <Row> {nationality}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Fecha de Nacimiento</Row>
                            <Row> {birthdate}</Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <Container className={"justify-content-center"} >
                            <Row>Biografia</Row>
                            <Row> {biography}</Row>
                        </Container>
                    </Col>
                </Row>
                {
                    (organization)? <Row>
                        <Col sm={{ size: 'auto', offset: 3 }}>
                            <Container className={"justify-content-center"} >
                                <Row>Organización afiliada</Row>
                                <Row> {organization}</Row>
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