import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Container from "reactstrap/es/Container";
import {ENTREPRENEUR, REMOVE} from "../../Constants/Endpoint";
import Paginator from "../Paginator";
import {withAuthentication} from '../Session';
import * as ROUTES from '../../Constants/routes';
import axios from 'axios';
import Spinners from "../Wait";

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
            wait:false,
            waitInterested: true
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
            const {status, maxpage} = response.data;
            console.log(response.data);
          //  console.log(response.config);
            if(status){
                const {interested, title, description, category, state, financists} = response.data;
                if(interested){
                    const financistList = [];
                    Object.values(financists).map(item => financistList.push(item));
                    if(this._isMounted){
                        this.setState({financists: financistList, max: maxpage});
                    }

               }
                setTimeout(()=> {
                    if(this._isMounted){
                        this.setState({waitInterested: false});
                    }
                }, 1000)
                if(this._isMounted){
                    this.setState({interested, title, description, category, state});
                }
            }else{
                setTimeout(()=> {
                    if(this._isMounted){
                        this.setState({waitInterested: false});
                    }
                }, 1000)
                if(this._isMounted){
                    this.setState({error: "No Fue Posible recuperar las ideas"});
                }
            }
        });
    }


    fetchPage = (page) => {
        const{id} = this.props.match.params;
        axios({
            method: 'POST',
            url: ENTREPRENEUR,
            data: {
                iid: id,
                option: 'id',
                rows: 3,
                page: page,
            },
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            // console.log(response.config);
            const {status, maxpage} = response.data;
            console.log(response.data);
            //  console.log(response.config);
            if(status){
                const {interested, title, description, category, state, financists} = response.data;
                if(interested){
                    const financistList = [];
                    Object.values(financists).map(item => financistList.push(item));
                    if(this._isMounted){
                        this.setState({financists: financistList, max: maxpage});
                    }
                }

                setTimeout(()=> {
                    if(this._isMounted){
                        this.setState({waitInterested: false});
                    }
                }, 1000)

                if(this._isMounted){
                    this.setState({interested, title, description, category, state});
                }
            }else{
                if(this._isMounted){
                    this.setState({error: "No Fue Posible recuperar las ideas"});
                }
            }
        });
    };

    onArrowMove = (e, move) => {
        e.preventDefault();
        console.log(move);
        const{max, perTag} = this.state;
        let {initPage, currentPage} = this.state;
        //If we are at the first page don't try to go to the first group
        if(move === 'first'  && (initPage-1)) {
            initPage = initPage-perTag;
            currentPage = initPage;
            // Go to Last Group Still needs some checking
        }else if (move === 'last' && ((initPage+perTag) <= max)) {
            initPage = initPage+perTag;
            currentPage = initPage;
            //If currentPage == 1 don't do previous
        }else if(move === 'previous' && (currentPage-1)){
            currentPage--;
            //    If current Page >= max don't do next
        }else if(move === 'next' && (currentPage < max)){
            currentPage++;
        }
        if((initPage+perTag) === currentPage) {
            initPage = initPage+perTag;
        } else if (currentPage < initPage) {
            initPage = initPage-perTag;
        }

        this.onPageMove(currentPage);
        console.log(`Current page:  ${currentPage}  init page:  ${initPage}`);
        this.setState({currentPage, initPage});
    };



    onPageMove = (newPage) => {
        const {currentPage} = this.state;
        if(currentPage !== newPage) {
            this.setState({waitInterested: true});
            this.fetchPage(newPage);
            // this.setState({currentPage:newPage});
        }
    };

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
        this.setState({wait:true});
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
                        setTimeout(() => {
                            this.props.history.push(ROUTES.LISTIDEA+ '/delete');
                        }, 1000)
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
        const {title, description, category, state, interested, financists,
            deleteIdea, initPage, perTag, currentPage, max, wait, waitInterested} = this.state;
        let users = financists.map((i) => {
            return <tr key={i.uid}>
                <td>{i.firstname} {i.lastname}</td>
                <td><Button color={'link'}>Detalles</Button></td>
            </tr>;
        });

        console.log(users);
        return (
            <React.Fragment>
                {
                    (wait)?
                        <Spinners/>
                    :
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
                                    <Table hover={!waitInterested && interested}>
                                        <tbody>
                                        <React.Fragment>
                                            {
                                                (waitInterested)?
                                                    <tr>
                                                        <td>
                                                            <Spinners noRows/>
                                                        </td>
                                                    </tr>
                                                    :
                                                    <React.Fragment>
                                                    { (interested)?  <React.Fragment>{users}</React.Fragment>: <tr><td>No hay interesados</td></tr>  }
                                                    </React.Fragment>
                                            }
                                        </React.Fragment>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row >
                                <Col sm="4" md={{size: 4, offset: 2}}>
                                    <Button color={"danger"} onClick={() => this.route(ROUTES.LISTIDEA)}>Regresar a la lista</Button>
                                </Col>
                                <Col sm="4" md={{size: 4, offset: 2}}>

                                    {(interested && !waitInterested)?
                                        <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={max} onArrowMove={this.onArrowMove}
                                                   onPageMove = {this.onPageMove}/>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default withAuthentication(Desc);