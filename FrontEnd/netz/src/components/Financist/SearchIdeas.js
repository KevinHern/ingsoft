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
import BookIdeas from './BookIdeas';
import NoMatch from "../NoMatch/NoMatch";
import IdeaList from './IdeaList';
import Spinners from "../Wait";

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
            perTag: 3,
            maxpage: 0,
            initPage: 1,
            showPaginator: false,
            wait :false
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

    // saveChanges = () => {
    //     console.log("I was called");
    //     const{uid, removeBook, newBook} = this.state;
    //     console.table(removeBook);
    //     console.table(newBook);
    //     // const prueba = [1,2,3, 7, 8];
    //     const ideasBook = newBook.map((idea) => {
    //         return {iid: idea};
    //     });
    //
    //     const ideasRemove = removeBook.map((idea) => {
    //         return {iid: idea};
    //     });
    //     const register = {
    //         option: 'addBook',
    //         uid,
    //         ideas : ideasBook
    //
    //     };
    //     const remove = {
    //         option: 'book',
    //         finid: uid,
    //         ideas: ideasRemove
    //     };
    //     if(removeBook.length){
    //         axios(
    //             {
    //                 url: REMOVE,
    //                 method: 'post',
    //                 data: remove,
    //                 headers: {'Content-Type': 'application/json'}
    //             }).then((response) => {
    //             console.log(response.data)
    //         });
    //     }
    //
    //     if(newBook.length) {
    //         axios(
    //             {
    //                 url: FINANCISTEND,
    //                 method: 'post',
    //                 data: register,
    //                 headers: {'Content-Type': 'application/json'}
    //             }).then((response) => {
    //             console.log(response.data)
    //         });
    //     }
    // };


    // componentWillUnmount() {
    //    this.saveChanges();
    // };


    addBook(register) {
        axios(
                    {
                        url: FINANCISTEND,
                        method: 'post',
                        data: register,
                        headers: {'Content-Type': 'application/json'}
                    }).then((response) => {
                       console.log(response.data)
                });
    }

    deleteBook(remove) {
        axios(
                    {
                        url: REMOVE,
                        method: 'post',
                        data: remove,
                        headers: {'Content-Type': 'application/json'}
                    }).then((response) => {
                       console.log(response.data)
                });
    }

    toggleStar = (iid, add_remove) => {
        let{newBook, uid} = this.state;
        if(add_remove) {
            // if(removeBook.includes(iid)){
            //    removeBook = removeBook.filter((i) => i !== iid );
            // }else{
            //     newBook.push(iid);
            // }
            //Do you want to use a list? comment this out
            newBook.push(iid);
            this.addBook({ option: 'addBook',
                        uid,
                        ideas : [{iid}]})
        }else{
            // if(newBook.includes(iid)){
            //     newBook = newBook.filter((i) => i !== iid );
            // }else{
            //     removeBook.push(iid);
            // }
            //Do you want to use a list? comment this out
            newBook = newBook.filter((idea) => idea !== iid);
            this.deleteBook({ option: 'book',
                finid: uid,
                ideas : [{iid}]})
        }
        this.setState({newBook});
    };

    route = (route) => {
      const{history} = this.props;
      this.setState({showPaginator: false, ideas: []});
      history.push(route);
    };

    onArrowMove  = (e, move) => {
        e.preventDefault();
        console.log(move);
        const{maxpage, perTag} = this.state;
        let {initPage, currentPage} = this.state;
        // console.log(`Init Page ${initPage} Current Page ${currentPage}, Max Page ${maxpage}`);
        //If we are at the first page don't try to go to the first group
        if(move === 'first'  && (initPage-1)) {
            initPage = initPage-perTag;
            currentPage = initPage;
            // Go to Last Group Still needs some checking
        }else if (move === 'last' && ((initPage+perTag) <= maxpage)) {
            initPage = initPage+perTag;
            currentPage = initPage;
            //If currentPage == 1 don't do previous
        }else if(move === 'previous' && (currentPage-1)){
            currentPage--;
            //    If current Page >= max don't do next
        }else if(move === 'next' && (currentPage < maxpage)){
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

    onPageMove = (newPage) => {
        const {currentPage} = this.state;
        console.log(`Current Page ${currentPage} New Page ${newPage}`);
        if(currentPage !== newPage) {
            this.fetchIdeas(newPage);
            this.setState({currentPage:newPage});
        }
    };



    fetchIdeas = (currentPage, search=false) => {
        const{category, rows} = this.state;
        const{fireBase} = this.props;
        this.setState({wait:true});
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
                    // console.table(response.data);
                    // console.table(response.config);
                    Object.values(response.data.ideas).map(idea => ideas.push(idea));
                    this.setState({ideas, error: null, maxpage:response.data.maxpage,
                        showPaginator: true, newBook : [], removeBook: [],
                         wait:false});
                    if(search){
                        this.setState({initPage:1, currentPage:1, newBook : [], removeBook: [],
                        wait:false
                        })
                    }
                } else {
                    setTimeout(() => {
                        this.setState({error: response.data['message'], showPaginator: false,
                            newBook : [], removeBook: [], wait:false
                        });
                    }, 1000
                    )

                }
            });
            console.log(uid);
            this.setState({uid});
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };


    render() {
        const{cats, error, ideas, newBook, removeBook, initPage,
            currentPage, maxpage, perTag, showPaginator,
            category, rows, wait
        } = this.state;
        console.log(maxpage);
        const catsOp = cats.map((cat) => {
            return <option key = {cat.name} value = {cat.id} >{cat.name}</option>
        });

        catsOp.unshift(<option key = {'Todas'} value = {-1} >Todas</option>);
        let ideasDesc;
        if(ideas.length){
            ideasDesc = ideas.map(idea => <Idea idea={idea} bookMarked = {false}  key={idea.title+idea.uid} toggleStar= {this.toggleStar}
                                                      newBook = {newBook} removeBook = {removeBook}/>);
        }

        return (
            <Switch>
                    <Route path={`${BOOKMARK}`} render = {(props) =>
                        <BookIdeas {...props} catsOp={catsOp} route = {this.route}/>}/>
                <Route exact path = {FINANCIST}>
                    <React.Fragment>
                        <Row className={"mt-5 justify-content-end"}>
                            <Col sm={{size: 5}} className={""}>
                                <h1 >Buscar Ideas por Categoria</h1>
                            </Col>
                            <Col   sm={{size: 3}}>
                                <ButtonToolbar className={"justify-content-end"}>
                                    <ButtonGroup>
                                        <Button color={"info"} onClick={() =>{
                                                this.route(BOOKMARK);
                                            }
                                        }>BookMark</Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <IdeaList catsOp = {catsOp}   route = {this.route} onChange={this.onChange} ideasDesc = {ideasDesc} error = {error}
                                              fetchIdeas = {this.fetchIdeas} category={category} rows={rows} wait={wait}/>
                                    {(showPaginator)?
                                        <Row className={"justify-content-md-center mt-5"}>
                                            <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={maxpage} onArrowMove={this.onArrowMove}
                                                       onPageMove = {this.onPageMove}/>
                                        </Row>:null
                                    }
                </React.Fragment>
                </Route>
                <Route>
                    <NoMatch/>
                </Route>
            </Switch>
        );
    }
}



export default withAuthentication(SearchIdeas)

