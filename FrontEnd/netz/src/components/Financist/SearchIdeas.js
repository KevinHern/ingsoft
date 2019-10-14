import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, ListGroup, ListGroupItem, Form, Label} from 'reactstrap';
import Input from "reactstrap/es/Input";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import FormGroup from "reactstrap/es/FormGroup";
import axios from 'axios';
import Paginator from "../Paginator";
import {CATEGORY, FINANCIST} from "../../Constants/Endpoint";
import Idea from './Idea';
import {UpdateFieldCom} from "../User/Modify";
import {Switch, Route} from 'react-router-dom';

class SearchIdeas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            category: 1,
            cats: [
            ],
            ideas: [],
            page: 1,
            rows: 3,
            error: null
        };
    }

    componentDidMount() {
        axios({
            url: CATEGORY,
            method: 'post',
        }).then(response => {
            let cats = [];
            if(response.data['status']) {
                delete response.data['status'];
                Object.values(response.data).map(item => cats.push(item));
                // console.log(cats);
                const cat = cats[0].id;
                this.setState({cats, cat})
            }else{
                console.log("error")
            }
        });
    }


    toggleHeart = () => {

    };



    fetchIdeas = (e) => {
        const{category, rows, page} = this.state;
        e.preventDefault();
        axios({
            url: FINANCIST,
            data: {
                option: 'list',
                rows:  rows,
                page: page,
                category:  category,
            },
            headers: { 'Content-Type': 'application/json'},
            method: 'post',
        }).then(response => {
            let ideas = [];
            console.log(response.data);

            if(response.data['status']) {
                const ideas  = [];
                Object.values(response.data.ideas).map(idea => ideas.push(idea));
                this.setState({ideas, error:null});
            }else{
                this.setState({error: response.data['message']});
            }
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };


    render() {
        const{cats, error, ideas} = this.state;
        const catsOp = cats.map((cat) => {
            return <option key = {cat.name} value = {cat.id} >{cat.name}</option>
        });

        const ideasDesc = ideas.map(idea => <Idea idea={idea} bookMarked = {false} key={idea.title+idea.uid} toggleHeart= {this.toggleHeart}/>);
        return (
                <React.Fragment>
                    {/*<Switch>*/}
                    {/*    <Route path={`${path}/:typeMode/name`} render = {(props) =>*/}
                    {/*        /!*<UpdateFieldCom {...props} inputs = {[{field: 'Nombre', type : 'text', value : firstname}, {field: 'Apellido', type : 'text', value : lastname}]} />}/>*!/*/}
                    {/*</Switch>*/}
                <Row className={"mt-5 justify-content-end"}>
                    <Col sm={{size: 5}} className={""}>
                        <h1 >Buscar Ideas por Categoria</h1>
                    </Col>
                    <Col   sm={{size: 3}}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"}>Principal</Button>
                                <Button color={"info"}>Cuenta</Button>
                                <Button color={"info"}>BookMark</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className={"mt-5  justify-content-center"}>
                    <Col sm={{size: 6, offset:3}}>
                        <Form>
                            <FormGroup row>
                                <Label for="cat" sm={3} >Categorias</Label>
                                <Col sm={{ size: 3}}>
                                    <Input  type={'select'} id="category"  name = "category" onChange={this.onChange} defaultValue={0}>
                                        {catsOp}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="cat"   sm={3}>Ideas por Pagina</Label>
                                <Col sm={{ size: 3}}>
                                    <Input  type={'select'} id="rows"  name = "rows"  onChange={this.onChange} defaultValue={3}>
                                        <option value={1} >1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                {
                    (error)? <div>error</div>: <div>{ideasDesc}</div>
                }
                <Row className={"mt-4 justify-content-center"}>
                    <Col sm={{ size: 1}} >
                        <div className={"justify-content-center "}>
                            <Button  color={'primary'} onClick={this.fetchIdeas}>Buscar</Button>
                        </div>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center mt-5"}>
                    <Paginator initPage={1} perTag = {3} currentPage = {1} max ={5} onArrowMove={this.onArrowMove}
                               onPageMove = {this.onPageMove}/>
                </Row>
            </React.Fragment>
        );
    }
}



export default SearchIdeas


        // <Form>
        //     <FormGroup row>
        //         <Label sm={{ size: 2}}>>Ideas por pagina</Label>
        //         <Col sm={{ size: 10}}>
        //             <Input className={"mt-4"} type={'select'} onChange={this.onChange}>
        //                 <option value={1}>aaa</option>
        //                 <option value={2}>bbb</option>
        //                 <option value={3}>ccc</option>
        //                 <option value={4}>ddd</option>
        //                 <option value={5}>eee</option>
        //             </Input>
        //         </Col>
        //     </FormGroup>
        //     <FormGroup row>
        //         <Col sm={{ size: 3}} >
        //             <Input className={"mt-4"} type={'select'} onChange={this.onChange}>
        //                 <option value={1}>1</option>
        //                 <option value={2}>2</option>
        //                 <option value={3}>3</option>
        //                 <option value={4}>4</option>
        //                 <option value={5}>5</option>
        //             </Input>
        //         </Col>
        //         <Col sm={{ size: 2}}>
        //             <Button  className={"mt-4"} color={'primary'} onClick={this.fetchIdeas}>Buscar</Button>
        //         </Col>
        //     </FormGroup>
        // </Form>
    // </Col>
    // <Col sm={{size: 4, offset:3}}>
    // </Col>