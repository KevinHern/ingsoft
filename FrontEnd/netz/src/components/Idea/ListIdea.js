import {Alert, Button, ButtonGroup, ButtonToolbar, Col, Form, Row, Table} from "reactstrap";
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
            search: '',
            perTag: 4,
            perPage: 4,
            newIdea: false,
            fetched: false,
            ideas: [],
            error: null
        };
    }

    onSubmit = (e)   => {
        e.preventDefault();
        const{search} = this.state;
        console.log(search);
    };


    componentDidMount() {
        const maxResults = 10;
        if(maxResults) {

        }else {
            // this.setState({empty:true})
        }
        const {newIdea} = this.props.match.params;
        if(newIdea === 'new'){
            // this.setState({newIdea: true})
        }
        // console.log(newIdea);
        // let max = 0;
        // this.setState({max})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {perPage, search, fetched} =this.state;
        const {fireBase} = this.props;
        const {prevFetched} = prevState;
        if(!fetched){
            fireBase.token().then((response) => {
                axios({
                    method: 'POST',
                    url: ENTREPRENEUR ,
                    data: {
                        uid: response,
                        option: 'gi',
                        rows: 7,
                        page: 1,
                        category: 1,
                    },
                    headers: {'Content-Type': 'application/json'}
                }).then((response) => {
                    // console.log(response.config);
                    let{status, maxPage, ideas} = response.data;
                    // console.log(response.data);
                    if(status){
                        const ideaList = [];
                        Object.values(ideas).map(item => ideaList.push(item));
                        this.setState({maxPage, ideas: ideaList});
                    }else{
                        this.setState({error: "No Fue Posible recuperar las ideas"});
                    }
                })
            });
            this.setState({fetched:true});
        }
    }



    onPageMove = (currentPage) => {
        this.fetchPage(currentPage);
        this.setState({currentPage});
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

        console.log(`Current page:  ${currentPage}  init page:  ${initPage}`);
        this.setState({currentPage, initPage});
    };

    search  = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    route = (goTo) => {
        const{history} = this.props;
        history.push(goTo);
    };


    render() {
        const{initPage, currentPage, max, perTag, empty, newIdea, ideas, error} = this.state;
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
                                        <Alert color={"success"}>Nueva Idea creada</Alert>
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
                                        <Input type="text" name="search" id="search" placeholder="Buscar" onChange = {this.search}/>
                                        <Button type={"submit"}>
                                            <FaSearch/>
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (error)? <Alert>No fue posible listar ideas</Alert> : <List  ideas={ideas} showDetails = {this.showDetails}/>
                        }
                        </tbody>
                    </Table>
                </Row>
                <Row className={"justify-content-md-center"}>
                    <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={max} onArrowMove={this.onArrowMove}
                               onPageMove = {this.onPageMove}/>
                </Row>
            </React.Fragment>
        )
    }
}

export default withAuthentication(ListIdea);