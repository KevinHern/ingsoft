import React, {Component} from 'react';
import {FINANCIST} from "../../Constants/routes";
import {Button, ButtonGroup, ButtonToolbar, Col, Form, Label, Row} from "reactstrap";
import Idea from "./Idea";
import {withAuthentication} from '../Session';
import axios from 'axios';
import {FINANCISTEND, REMOVE} from "../../Constants/Endpoint";
import Paginator from "../Paginator";
import IdeaList from "./IdeaList";
import Spinners from "../Wait";
import PropTypes from 'prop-types';


/**
 * Manages the list of ideas that have been bookmarked by a financist
 */

class BookIdeas extends Component {

    /**
     *
     * Contstructor with default values for state
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            rows : 3,
            currentPage: 1,
            category: -1,
            fetched: false,
            error: true,
            newBook: [],
            perTag: 3,
            maxpage: 0,
            initPage: 1,
            wait: false
        };
    }

    /**
     * LifeCycle method from React
     * Here we fetch the ideas that have been bookmarked by the user
     */

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
                        this.setState({ideas, uid, showPaginator: true, maxpage: response.data.maxpage,
                        cantIdeas: response.data.cantIdeas, error:null})
                    }else{
                        this.setState({error: response.data.message})
                    }
                });
            });
            this.setState({fetched:true});
        }
    }

    /**
     * OnArrowMove will be passed as a prop to a Paginator Component
     * @param e
     * @param move -> {first| last | previous | next}
     */

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

    /**
     * Sets the state with the new page of ideas to be showed
     * @param newPage
     */

    onPageMove = (newPage) => {
        const {currentPage} = this.state;
        console.log(`Current Page ${currentPage} New Page ${newPage}`);
        if(currentPage !== newPage) {
            this.fetchIdeas(newPage);
            this.setState({currentPage:newPage});
        }
    };

    /**
     * Method to look for ideas in the backend
     * @param currentPage
     * @param search -> string that will be searched among the titles of the ideas
     */

    fetchIdeas = (currentPage, search=false) => {
        const{category, rows} = this.state;
        const{fireBase} = this.props;
        this.setState({wait: true});
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
                    const{cantIdeas} = response.data;
                    console.log(`${cantIdeas} cantidad`);
                    console.table(response.data);
                    Object.values(response.data.ideas).map(idea => ideas.push(idea));
                    this.setState({ideas, error: null, maxpage:response.data.maxpage, showPaginator: true, cantIdeas, wait:false});
                    if(search){
                        this.setState({initPage:1, currentPage:1})
                    }
                } else {
                    console.log(response.data.message);
                    this.setState({error: response.data.message, showPaginator: false, wait:false});
                }
            });
            this.setState({uid});
        });
    };

    /**
     * Method to keep track of the new category chosen
     * @param e
     */
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };


    /**
     *  TODO Thorough testing
     *  This method sets the new maxPage, and the new  quantity of bookmarked ideas
     *  belonging to this financist, also changes currentPage if necessary
     * @returns {*[]}
     */
    updateMaxPage = () => {
        let{cantIdeas, maxpage, rows, currentPage} = this.state;
        console.log(cantIdeas);
        let maxPage = maxpage;
        if(((cantIdeas-1) % rows) === 0) {
            maxPage = Math.floor((cantIdeas-1)/rows);
        }else{
            maxPage = Math.floor((cantIdeas-1)/rows) +1;
        }

        if(currentPage > maxPage) {
           currentPage = currentPage -1;
        }
        return [maxPage, cantIdeas-1, currentPage];
    };

    /**
     * TODO REFACTOTRING AND CLEANING
     * Unbookmark and idea and lets the backend know about it
     * @param iid
     * @param add_remove, this parameter is not necessary
     */
    breakStar = (iid, add_remove) => {
        let{ideas, uid} = this.state;
        ideas = ideas.filter((idea) => idea.iid !== iid);
        const ideasRemove = [{iid}];
        const remove = {
            option: 'book',
            finid: uid,
            ideas: ideasRemove
        };
        const [maxpage, cantIdeas, currentPage] = this.updateMaxPage();
        axios(
            {
                url: REMOVE,
                method: 'post',
                data: remove,
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
            console.log(response.data)
            if(currentPage !== this.state.currentPage){
                this.fetchIdeas(currentPage);
            }

        });
        this.setState({ideas, maxpage, cantIdeas});

    };


    /**
     * TODO SAVE CHATREQUESTS IN CLOUD FIRESTORE
     * @param uid
     * @param iid
     * @param title
     */
    addChatRequests = (uid, iid, title) => {
        const{fireBase} = this.props;

        // fireBase.currentUser.uid;
    };

    /**
     * React lifecycle method , render
     * @returns {*}
     */

    render() {
        const{ideas, fetched, newBook, removeBook, error, initPage, currentPage,
            perTag, maxpage, wait,
        category, rows} = this.state;
        let{showPaginator} = this.state;
        const{catsOp, route} = this.props;
        console.log(`${maxpage} Maxpage`);
        let ideasDesc = <Spinners/>;
        console.log(error);
        if(fetched && ideas && !wait){
            ideasDesc = ideas.map(idea => <Idea idea={idea} bookMarked ={true} key={idea.title+idea.uid} toggleStar= {this.breakStar}
                                                newBook = {newBook} chat={true} addChatRequests = {this.addChatRequests}/>);
        }
        console.log(ideasDesc);
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
                                  fetchIdeas = {this.fetchIdeas} category={category} rows={rows} wait={wait}/>
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

//
BookIdeas.propTypes = {
  catsOp: PropTypes.arrayOf(PropTypes.node),
  route: PropTypes.func.isRequired,
  fireBase: PropTypes.object
};




export default withAuthentication(BookIdeas);
