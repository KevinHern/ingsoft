import React, {Component} from 'react';
import {FINANCIST} from "../../Constants/routes";
import {Button, ButtonGroup, ButtonToolbar, Col, Form, Label, Row} from "reactstrap";
import Idea from "./Idea";
import {withAuthentication} from '../Session';
import axios from 'axios';
import {FINANCISTEND, REMOVE} from "../../Constants/Endpoint";
import Paginator from "../Paginator";
import IdeaList from "./IdeaList";

class BookIdeas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            rows : 3,
            currentPage: 1,
            category: -1,
            fetched: false,
            error: undefined,
            removeBook: [],
            newBook: [],
            perTag: 3,
            maxpage: 0,
            initPage: 1,
        };
    }

    componentDidUpdate() {
        const{fireBase} = this.props;
        const{rows, currentPage, category, fetched} = this.state;
        const promise = fireBase.token();
        if(promise && !fetched) {
            promise.then((uid) => {
                axios({
                    url: FINANCISTEND,
                    data: {
                        option: 'book',
                        uid,
                        rows: rows,
                        page: currentPage,
                        category: category,
                    },
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                }).then( (response) => {
                    console.log(response);
                    if(response.data.status) {
                        const ideas = [];
                        console.table(response.data);
                        Object.values(response.data.ideas).map(idea => ideas.push(idea));
                        this.setState({fetched:true, ideas, uid})
                    }else{
                        this.setState({fetched:true, error: response.data.message})
                    }
                });
            });
        }
    }

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
        fireBase.token().then((uid) => {
            axios({
                url: FINANCISTEND,
                data: {
                    option: 'book',
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
                    this.setState({ideas, error: null, maxpage:response.data.maxpage, showPaginator: true});
                    if(search){
                        this.setState({initPage:1, currentPage:1})
                    }
                } else {
                    this.setState({error: response.data['message'], showPaginator: false});
                }
            });
            this.setState({uid});
        });
    };

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    saveChanges = () => {
        console.log("I was called");
        const{uid, removeBook} = this.state;
        // const prueba = [1,2,3, 7, 8];

        const ideasRemove = removeBook.map((idea) => {
            return {iid: idea};
        });
        const remove = {
            option: 'book',
            finid: uid,
            ideas: ideasRemove
        };
        if(removeBook.length){
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
    };

    // componentWillUnmount() {
    //     this.saveChanges();
    // };

    breakHeart = (iid, add_remove) => {
        let{removeBook, ideas, uid} = this.state;
        ideas = ideas.filter((idea) => idea.iid !== iid);
        const ideasRemove = [{iid}];
        const remove = {
            option: 'book',
            finid: uid,
            ideas: ideasRemove
        };
        axios(
            {
                url: REMOVE,
                method: 'post',
                data: remove,
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
            console.log(response.data)
        });
       // this.saveChanges();
        this.setState({removeBook, ideas});
    };


    render() {
        const{ideas, fetched, newBook, removeBook, error, initPage, currentPage, perTag, maxpage} = this.state;
        let{showPaginator} = this.state;
        const{catsOp, route} = this.props;
        let ideasDesc = <div>Loading...</div>;
        if(fetched && !error){
            ideasDesc = ideas.map(idea => <Idea idea={idea} bookMarked = {true} key={idea.title+idea.uid} toggleHeart= {this.breakHeart}
                                                newBook = {newBook} removeBook = {removeBook}/>);
        }
        if(!ideasDesc.length){
            showPaginator = false;
        }
        return (
            <React.Fragment>
                <Row className={"mt-5 justify-content-end"}>
                    <Col sm={{size: 5}} className={""}>
                        <h1 >BookMark</h1>
                    </Col>
                    <Col   sm={{size: 3}}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"} onClick={() => route(FINANCIST)}>Listar Ideas</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <IdeaList catsOp = {catsOp}   onChange={this.onChange} ideasDesc = {ideasDesc} error = {error}
                          fetchIdeas = {this.fetchIdeas}/>
                {
                    (showPaginator)?
                    <Row className={"justify-content-md-center mt-5"}>
                        <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={maxpage} onArrowMove={this.onArrowMove}
                                   onPageMove = {this.onPageMove}/>
                    </Row>:null
                }
            </React.Fragment>
        );
    }
}

export default withAuthentication(BookIdeas);
