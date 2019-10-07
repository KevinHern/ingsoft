import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, ListGroup, ListGroupItem, Form, Label} from 'reactstrap';
import Input from "reactstrap/es/Input";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import FormGroup from "reactstrap/es/FormGroup";
import axios from 'axios';
import Paginator from "../Paginator";

class SearchIdeas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cat: "",
            cats: [
                {id:1, name: "nombre1"},
                {id:2, name: "nombre2"},
                {id:3, name: "nombre3"},
                {id:4, name: "nombre4"}
            ]
        };
    }

    componentDidMount() {
        // new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve('🤡');
        //     }, 5000);
        // });
        // // axios
    }

    fetchIdeas = (e) => {
        e.preventDefault();
    };

    onChange = (e) => {
        this.setState({cat:e.target.value});
    };


    render() {
        const{cats } = this.state;
        // const listCats = cats.map((cat) => {
        //     <li></li>
        // });
        return (
            <React.Fragment>
                <Row className={"mt-5"}>
                    <Col sm={{size: 4, offset:4}}>
                        <h1 >Buscar Ideas por Categoria</h1>
                    </Col>
                    <Col   sm={{size: 4}}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                <Button color={"info"}>Principal</Button>
                                <Button color={"info"}>Cuenta</Button>
                                <Button color={"info"}>BookMark</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <Col sm={{size: 8, offset:3}}>
                        <Form>
                            <FormGroup row>
                                <Label for="cat" sm={2} >Categorias</Label>
                                <Col sm={{ size: 5}}>
                                    <Input  type={'select'} id="cat" onChange={this.onChange} defaultValue={0}>
                                        <option value={0}>Todas</option>
                                        <option value={1}>aaa</option>
                                        <option value={2}>bbb</option>
                                        <option value={3}>ccc</option>
                                        <option value={4}>ddd</option>
                                        <option value={5}>eee</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="cat"   sm={2}>Ideas por Pagina</Label>
                                <Col sm={{ size: 3}}>
                                    <Input  type={'select'} id="cat" onChange={this.onChange} defaultValue={3}>
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
                <Row>
                    <Col sm={{ size: 2, offset:5}} >
                        <Button  className={"mt-4 ml-4"} color={'primary'} onClick={this.fetchIdeas}>Buscar</Button>
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <Col sm={{size: 4, offset:4}}>
                   <ListGroup className={"justify-content-center"}>
                       <ListGroupItem>
                           <ListGroupItemHeading>Title</ListGroupItemHeading>
                           <ListGroupItemText>Praesent justo urna, congue ac mauris vel, faucibus facilisis est. Integer ante ex, pulvinar at facilisis non, so</ListGroupItemText>
                           <ListGroupItemText  className="text-info">Author</ListGroupItemText>
                       </ListGroupItem>
                       <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                   </ListGroup>
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <Col sm={{size: 4, offset:4}}>
                        <ListGroup className={"justify-content-center"}>
                            <ListGroupItem>
                                <ListGroupItemHeading>Title</ListGroupItemHeading>
                                <ListGroupItemText>Praesent justo urna, congue ac mauris vel, faucibus facilisis est. Integer ante ex, pulvinar at facilisis non, sollicitudin ut ligula. Nam tempor tempor lorem, sed porttitor dolor accumsan sed. Morbi ut finibus justo, id dictum enim</ListGroupItemText>
                                <ListGroupItemText  className="text-info">Author</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem active tag="button" action>BookMark</ListGroupItem>
                </ListGroup>
                    </Col>
                </Row>

                <Row className={"mt-5"}>
                    <Col sm={{size: 4, offset:4}}>
                        <ListGroup className={"justify-content-center"}>
                            <ListGroupItem>
                                <ListGroupItemHeading>Title</ListGroupItemHeading>
                                <ListGroupItemText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed massa hendrerit, condimentum massa quis, sollicitudin risus. Maecenas orci nibh, viverra non tincidunt id, pretium vel orci. Fusce iaculis, dolor a fermentum lacinia, dui lectus semper mauris, vitae ornare lacus dolor vitae dolor. Vestibulum cursus tempus est, a fringilla ligula tincidunt posuere. Donec egestas elementum diam, ultrices condimentum elit consectetur in. Aenean luctus tortor a nisi eleifend posuere. Nam ac condimentum eros, et vestibulum nunc. In et molestie erat, non fringilla quam. Donec ut orci dapibus nibh accumsan tempus ac sit amet nunc. </ListGroupItemText>
                                <ListGroupItemText  className="text-info">Author</ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem color = "success"tag="button" action>BookMark</ListGroupItem>
                        </ListGroup>
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