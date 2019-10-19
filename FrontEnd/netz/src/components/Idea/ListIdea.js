import {UncontrolledAlert, Button, ButtonGroup, ButtonToolbar, Col, Form, Row, Table} from "reactstrap";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import List from "./List";
import Paginator from "../Paginator";
import React, {Component} from 'react';
import {FaSearch} from "react-icons/fa";
import * as ROUTES from '../../Constants/routes.js';
import axios from 'axios';
import {GETUSER, ENTREPRENEUR} from "../../Constants/Endpoint";
import withAuthentication from "../Session/withAuthentication";


class ListIdea extends Component {

    constructor(props) {
        super(props);
        this.state ={
            initPage: 1,
            currentPage:1,
            max: 5,
            filter: '',
            perTag: 3,
            perPage: 3,
            newIdea: false,
            deleteIdea: false,
            modifyIdea: false,
            fetched: false,
            ideas: [],
            error: null
        };
    }

    onSubmit = (e)   => {
        e.preventDefault();
        const{search} = this.state;
        // console.log(search);
    };


    componentDidMount() {
        const {changedIdea} = this.props.match.params;
        if(changedIdea === 'new'){
            this.setState({newIdea: true})
        }else  if(changedIdea === 'delete'){
            this.setState({deleteIdea: true})
        } else  if(changedIdea === 'modify'){
            this.setState({modifyIdea: true})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {perPage, search, fetched} =this.state;
        const {prevFetched} = prevState;
        if(!fetched){
            this.fetchPage(1);
            this.setState({fetched:true});
        }
    }

    fetchPage = (currentPage, search = false) => {
        const {fireBase} = this.props;
        const {perPage, filter} = this.state;
        fireBase.token().then((response) => {
            axios({
                method: 'POST',
                url: ENTREPRENEUR ,
                data: {
                    uid: response,
                    option: 'gi',
                    rows: perPage,
                    page: currentPage,
                    filter: filter,
                },
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                // console.log(response.config);
                let{status, maxpage, ideas} = response.data;
                // console.log(response.data);
                // console.log(response.config);
                if(status){
                    const ideaList = [];
                    Object.values(ideas).map(item => ideaList.push(item));
                    this.setState({max: maxpage, ideas: ideaList, error: 0});
                    if(search){
                        this.setState({initPage:1, currentPage:1})
                    }
                }else{
                    this.setState({error: "No Fue Posible recuperar las ideas"});
                }
            })
        });

    };


    onPageMove = (newPage) => {
        const {currentPage} = this.state;
        if(currentPage !== newPage) {
            this.fetchPage(newPage);
            this.setState({currentPage:newPage});
        }
    };

    showDetails = (id) => {
        this.props.history.push(ROUTES.DESCIDEA.replace(':id', id));
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
        // console.log(`Current page:  ${currentPage}  init page:  ${initPage}`);
        this.setState({currentPage, initPage});
    };

    filter  = (e) => {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    };

    route = (goTo) => {
        const{history} = this.props;
        history.push(goTo);
    };


    render() {
        const{initPage, currentPage, max, perTag, newIdea, ideas, error, deleteIdea, modifyIdea} = this.state;
        return (
            <React.Fragment>
                <Row className={"justify-content-end"}>
                    <Col sm={4}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"} onClick={() => {this.route(ROUTES.CREATEIDEA)}}>Crear Idea</Button>
                                {/*<Button color={"info"}  onClick={() => {this.route(ROUTES.HOME)}}>Principal</Button>*/}
                                <Button color={"info"}  onClick={() => {this.route(ROUTES.OVERVIEW)}}>Cuenta</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                {
                    (newIdea) ? <Row className={"justify-content-md-center mt-3"}>
                                    <Col sm={"12"}>
                                        <UncontrolledAlert color={"success"}>Nueva Idea creada</UncontrolledAlert>
                                    </Col>
                                </Row>: null
                }

                {
                    (deleteIdea) ? <Row className={"justify-content-md-center mt-3"}>
                        <Col sm={"12"}>
                            <UncontrolledAlert color={"danger"}>Idea Eliminada</UncontrolledAlert>
                        </Col>
                    </Row>: null
                }

                {
                    (modifyIdea) ? <Row className={"justify-content-md-center mt-3"}>
                        <Col sm={"12"}>
                            <UncontrolledAlert color={"success"}>Idea Modificada</UncontrolledAlert>
                        </Col>
                    </Row>: null
                }
                <Row className={"justify-content-md-center mt-1"}>
                    <Table hover responsive={true} size={""}>
                        <thead>
                        <tr>
                            <td>
                                Ideas
                            </td>
                            <td colSpan={2}>
                                <Form inline className={"justify-content-md-end"} onSubmit = {this.onSubmit}>
                                    <FormGroup>
                                        <Input type="text" name="filter" id="filter" placeholder="Buscar" onChange = {this.filter}/>
                                        <Button type={"submit"} onClick={() => {this.fetchPage(1, true)}}>
                                            <FaSearch/>
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (error)? <tr><td colSpan={2}><UncontrolledAlert>No fue posible listar ideas</UncontrolledAlert></td></tr> : <List  ideas={ideas} showDetails = {this.showDetails}/>
                        }
                        </tbody>
                    </Table>
                </Row>
                <Row className={"justify-content-md-center"}>
                    {(error)?
                        null:
                        <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={max} onArrowMove={this.onArrowMove}
                                   onPageMove = {this.onPageMove}/>
                    }
                     </Row>
            </React.Fragment>
        )
    }
}

export default withAuthentication(ListIdea);