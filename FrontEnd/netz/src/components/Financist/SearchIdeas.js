import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, ListGroup, ListGroupItem, Form, Label} from 'reactstrap';
import Input from "reactstrap/es/Input";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import FormGroup from "reactstrap/es/FormGroup";
import Paginator from "../Paginator";
import {CATEGORY, FINANCISTEND, REGISTER, REMOVE} from "../../Constants/Endpoint";
import Idea from './Idea';
import {withAuthentication} from '../Session';
import {UpdateFieldCom} from "../User/Modify";
import axios  from 'axios';
import {Switch, Route} from 'react-router-dom';
import {BOOKMARK, HOME, OVERVIEW, FINANCIST} from "../../Constants/routes";

class SearchIdeas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            category: -1,
            cats: [
            ],
            ideas: [],
            currentPage: 1,
            rows: 3,
            error: null,
            newBook: [],
            removeBook: [],
            max: 1,
            initPage: 1,
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

    componentWillUnmount() {
        console.log("I was called");
        const{uid, removeBook, newBook} = this.state;
        // const prueba = [1,2,3, 7, 8];
        const ideasBook = newBook.map((idea, index) => {
          return {["idea"+index] : idea};
        });

        const ideasRemove = removeBook.map((idea, index) => {
            return {["idea"+index] : idea};
        });
        const register = {
            option: 'addBook',
            uid,
            ideas : ideasBook

        };
        const remove = {
            option: 'book',
            uid,
            ideas: ideasRemove
        };


        axios(
            {
                url: FINANCISTEND,
                method: 'post',
                data: register,
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
              console.log(response)
        });

        // axios(
        //     {
        //         url: REMOVE,
        //         method: 'post',
        //         data: remove,
        //         headers: {'Content-Type': 'application/json'}
        //     });
    };

    toggleHeart = (iid, add_remove) => {
        let{newBook, removeBook} = this.state;
        if(add_remove) {
            if(removeBook.includes(iid)){
               removeBook = removeBook.filter((i) => i !== iid );
            }else{
                newBook.push(iid);
            }
        }else{
            if(newBook.includes(iid)){
                newBook = newBook.filter((i) => i !== iid );
            }else{
                removeBook.push(iid);
            }
        }
        this.setState({newBook, removeBook});
    };

    route = (route) => {
      const{history} = this.props;
      history.push(route);
    };

    onArrowMove  = (newPage) => {
        const {currentPage} = this.state;
        if(currentPage !== newPage) {
            this.fetchIdeas(newPage);
           // this.setState({currentPage:newPage});
        }
    };

    onPageMove = (e, move) => {
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



    fetchIdeas = (e, currentPage=1) => {
        e.preventDefault();
        const{category, rows} = this.state;
        const{fireBase} = this.props;
        fireBase.token().then((uid) => {
            axios({
                url: FINANCISTEND,
                data: {
                    option: 'list',
                    uid,
                    rows: rows,
                    page: currentPage,
                    category: category,
                },
                headers: {'Content-Type': 'application/json'},
                method: 'post',
            }).then(response => {
                let ideas = [];
                console.log(response.data);
                if (response.data['status']) {
                    const ideas = [];
                    console.table(response.data);
                    Object.values(response.data.ideas).map(idea => ideas.push(idea));
                    this.setState({ideas, error: null});
                } else {
                    this.setState({error: response.data['message']});
                }
            });
            this.setState({uid});
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };


    render() {
        const{cats, error, ideas, newBook, removeBook, initPage, perTag, currentPage, max} = this.state;
        const catsOp = cats.map((cat) => {
            return <option key = {cat.name} value = {cat.id} >{cat.name}</option>
        });


        catsOp.unshift(<option key = {'Todas'} value = {-1} >Todas</option>);
        const ideasDesc = ideas.map(idea => <Idea idea={idea} bookMarked = {false} key={idea.title+idea.uid} toggleHeart= {this.toggleHeart}
          newBook = {newBook} removeBook = {removeBook}/>);
        return (
            <Switch>
                <Route exact path = {FINANCIST}>
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
                                    <Button color={"info"} onClick={() => this.route(HOME)}>Principal</Button>
                                    <Button color={"info"} onClick={() => this.route(OVERVIEW)}>Cuenta</Button>
                                    <Button color={"info"} onClick={() => this.route(BOOKMARK)}>BookMark</Button>
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
                        (error)? <Row className={"mt-4 justify-content-center"}>
                                    <Col sm={{ size: 2}} >
                                        {error}
                                    </Col>
                                </Row>     :
                            <div>{ideasDesc}</div>

                    }
                    <Row className={"mt-4 justify-content-center"}>
                        <Col sm={{ size: 1}} >
                            <div className={"justify-content-center "}>
                                <Button  color={'primary'} onClick={this.fetchIdeas}>Buscar</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className={"justify-content-md-center mt-5"}>
                        <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={max} onArrowMove={this.onArrowMove}
                                   onPageMove = {this.onPageMove}/>
                    </Row>
                </React.Fragment>
                </Route>
            </Switch>
        );
    }
}



export default withAuthentication(SearchIdeas)


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