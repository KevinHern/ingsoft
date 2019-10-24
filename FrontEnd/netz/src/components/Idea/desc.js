import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Container from "reactstrap/es/Container";
import {ENTREPRENEUR, REMOVE} from "../../Constants/Endpoint";
import Paginator from "../Paginator";
import {withAuthentication} from '../Session';
import * as ROUTES from '../../Constants/routes';
import axios from 'axios';

class Desc extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            state: "",
            interested: "",
            financists: [],
            fetched: false,
            deleteIdea: false,
            initPage: 1,
            perTag: 3,
            currentPage:1,
            maxpage: 1,
        }
    }

// Maybe one day this will come in handy
    componentDidUpdate(prevProps, prevState, snapshot) {
        // const {fireBase} = this.props;
        // const{id} = this.props.match.params;
        // const{fetched} = this.state;
        //
        // //Si al ir a traer una idea no es necesario
        // //verificar el uid esta mal
        //
        // if(!fetched) {
        //     fireBase.token().then((response) => {
        //
        //     });
        //     this.setState({fetched:true});
        // }
    }



    componentDidMount() {
        this._isMounted = true;
        const{id} = this.props.match.params;
        axios({
            method: 'POST',
            url: ENTREPRENEUR,
            data: {
                iid: id,
                option: 'id',
                rows: 3,
                page: 1,
            },
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            // console.log(response.config);
            const {status} = response.data;
            console.log(response.data);
          //  console.log(response.config);
            if(status){
                const {interested, title, description, category, state, financists} = response.data;
                if(interested){
                    const financistList = [];
                    Object.values(financists).map(item => financistList.push(item));
                    if(this._isMounted){
                        this.setState({financists: financistList});
                    }
               }
                if(this._isMounted){
                    this.setState({interested, title, description, category, state});
                }
            }else{
                if(this._isMounted){
                    this.setState({error: "No Fue Posible recuperar las ideas"});
                }
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    editIdea = () => {
        const{id} = this.props.match.params;
        this.route(ROUTES.UPDATEIDEA.replace(':id', id ));
    };

    toggleDelete = () => {
        let {deleteIdea} = this.state;
        deleteIdea = !deleteIdea;
        this.setState({deleteIdea});
    };

    deleteIdea = () => {
        const{id} = this.props.match.params;
        axios({
                method: 'POST',
                url: REMOVE,
                data: {
                    option: 'idea',
                    iid:id
                },
                headers: {'Content-Type': 'application/json'}
            },
            ).then((response) => {
                if(response.data['status']) {
                    if(response.data['status']){
                        this.props.history.push(ROUTES.LISTIDEA+ '/delete');
                    }else{
                        console.log('Error en el servidor');
                    }
                }else{
                    console.log('Fallo');
                }
        });
    };

    route = (goTo) => {
        const{history} = this.props;
        history.push(goTo);
    };

    render() {
        //Still not managing if idea does not exist, although that shouldn't happen
        const {title, description, category, state, interested, financists, deleteIdea, initPage, perTag, currentPage, maxpage} = this.state;
        let users = financists.map((i) => {
            return <tr>
                <td>{i.firstname} {i.lastname}</td>
                <td><Button color={'link'}>Detalles</Button></td>
            </tr>;
        });

        console.log(users);
        return (
            <React.Fragment>
                    <Row className={"justify-content-end"}>
                        <Col sm={4}>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button color={"info"} onClick={this.editIdea}>Editar</Button>
                                    <Button color={"info"} onClick={this.toggleDelete}>Eliminar</Button>
                                    <Modal isOpen={deleteIdea} toggle={this.toggleDelete}>
                                        <ModalHeader toggle={this.toggleDelete}>Desea Eliminar?</ModalHeader>
                                        <ModalBody>
                                            <Container>
                                                <Row>
                                                    <Col xs="6">
                                                        Title: {title}
                                                    </Col>
                                                    <Col xs="6">
                                                        Category: {category}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.deleteIdea}>Eliminar</Button>{' '}
                                            <Button color="secondary" onClick={this.toggleDelete}>Cancelar</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Button color={"info"} onClick={() => this.route(ROUTES.OVERVIEW)}>Cuenta</Button>
                                    <Button color={"info"} onClick={() => this.route(ROUTES.HOME)}>Principal</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className={"mb-3"}>
                        <Col sm="12" md={{size: 6, offset: 2}}>.
                            <h1>Title:  {title}</h1>
                        </Col>
                    </Row>
                    <Row  >
                        <Col sm="2"  md={{size: 2, offset: 2}}>
                            <h4>Descripcion</h4>
                            <p>{description}</p>
                        </Col>
                        <Col sm="2" md={{size: 2, offset: 2}}>
                            <div>
                                <h4>Categoria</h4><p>{category}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2" md={{size: 2, offset: 2}}>
                            <h4>Estado</h4>
                            <p>{state}</p>
                        </Col>
                        <Col sm="2" md={{size: 3, offset: 2}}>
                            <div>
                                <h4>Cantidad de Interesados</h4>
                                <p>{interested}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 12, offset: 2}}>
                            <h4>Interesados</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8" md={{size: 8, offset: 2}}>
                        <Table hover>
                            <tbody>
                            {(users.length)?  <React.Fragment>{users}</React.Fragment>: <tr><td>No hay interesados</td></tr>  }
                            </tbody>
                        </Table>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm="4" md={{size: 4, offset: 2}}>
                            <Button color={"danger"} onClick={() => this.route(ROUTES.LISTIDEA)}>Cancelar</Button>
                        </Col>
                        <Col sm="4" md={{size: 4, offset: 2}}>
                            <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={maxpage} onArrowMove={this.onArrowMove}
                                       onPageMove = {this.onPageMove}/>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default withAuthentication(Desc);