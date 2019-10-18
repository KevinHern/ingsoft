import React, {Component} from 'react';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, ButtonGroup, ButtonToolbar, Col, CustomInput, Media, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import {CATEGORY, ENTREPRENEUR, REGISTER, STATE, UPDATE} from "../../Constants/Endpoint";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import withAuthentication from '../Session/withAuthentication.js'
import * as ROUTES from "../../Constants/routes";


class CreateIdeaCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            title: '',
            description: '',
            cat: 0,
            state: 0,
            states: [],
            iid: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        console.log(this.props.history);
        console.log();

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
        axios({
            url: STATE,
            method: 'post',
        }).then(response => {
            let states = [];
            if(response.data['status']) {
                delete response.data['status'];
                Object.values(response.data).map(item => states.push(item));
                // console.log(cats);
                const state = states[0].id;
                this.setState({states, state})
            }else{
                console.log("error")
            }
        });
        const iid = this.props.match.params['id'];
        if(iid) {
            axios({
                method: 'POST',
                url: ENTREPRENEUR,
                data: {
                    iid,
                    option: 'id',
                    rows: 3,
                    page: 1,
                },
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                const{states, cats} = this.state;
                console.log(response);
                this.setState({
                    title:response.data.title,
                    description: response.data.description,
                    state: response.data.stateid,
                    cat: response.data.categoryid,
                });
            });
            this.setState({iid});
        }
    }

    changeState = (e) => {
        // console.log(e.target.value);
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value})
    };



    async create(e) {
        e.preventDefault();
        console.log(this.props);
        try{
            const {fireBase} = this.props;
            const { title, description, cat, state} = this.state;
            const token =  await fireBase.token();
            const formData = new FormData;
            formData.append('option', 'idea');
            formData.append('uid', token);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', cat);
            formData.append('state', state);
            axios({
                url: REGISTER,
                method: 'post',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'},
            }).then(response => {
                if(response.data['status']){
                    this.props.history.push('/listidea/new');
                }else{
                    console.log('error en el servidor');
                }
            })
        }catch(error) {
            console.log(error);
        }
    }


    // updateField = (field, val) => {
    //     const{iid} = this.state;
    //    return axios({
    //               url: UPDATE,
    //               method: 'post',
    //               data: {
    //                   option: "idea",
    //                   iid,
    //                   attr: field,
    //                   val
    //               },
    //               headers: { 'Content-Type': 'application/json'},
    //           });
    // };



    // modify  = async (e) => {
    //     //If one fails we will not be able to notice
    //     e.preventDefault();
    //     const {cat, state, title, description} = this.state;
    //     try{
    //         const[titleStatus, descStatus, catStatus, stateStatus] = await Promise.all([
    //             this.updateField('title', title),
    //             this.updateField('description', description ),
    //             this.updateField('category', cat),
    //             this.updateField('state',  state)]
    //         );
    //         this.props.history.push('/listidea/modify');
    //     }catch(error){
    //         console.log(error)
    //     }
    // };


    modify  = (e) => {
        //If one fails we will not be able to notice
        e.preventDefault();
        const {cat, state, title, description, iid} = this.state;
        axios(
            {
                url: UPDATE,
                method: 'post',
                data: {
                        option: "idea",
                        iid,
                        title,
                        description,
                        category: cat,
                        state
                    },
                headers: { 'Content-Type': 'application/json'},
            }
        ).then((response) => {
            if(response.data['status']){
                this.props.history.push('/listidea/modify');
            }else{
                console.log(response.data.message);
                console.log("Update failed");
            }
        });
    };


    onSubmit(e){
        const {iid} = this.state;
        if(iid) {
            this.modify(e);
        }else{
            this.create(e);
        }
    }

    route = (goTo) => {
        const{history} = this.props;
        history.push(goTo);
    };

    render() {
        const {cats, states, iid, title, description, state, cat}  = this.state;

        const catsOp = cats.map((cat) => {
            return <option key = {cat.name} value = {cat.id} >{cat.name}</option>
        });
        const stateOp = states.map((state) => {
            return <option key = {state.name} value = {state.id} >{state.name}</option>
        });
        return (
            <React.Fragment>
                    <Row className={"justify-content-end"}>
                        <Col sm={4}>
                            <ButtonToolbar className={"justify-content-end"}>
                                <ButtonGroup>
                                    <Button color={"info"} onClick={() => {this.route(ROUTES.LISTIDEA)}}>Listar Ideas</Button>
                                    <Button color={"info"}  onClick={() => {this.route(ROUTES.OVERVIEW)}}>Cuenta</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}}>
                            {
                                (iid)?
                                    <h1>Modificar Idea</h1>
                                    :
                                    <h1>Crear Idea</h1>

                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}}>.
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup row>
                                    <Label sm={2} className={"pr-0"}>
                                        Titulo
                                    </Label>
                                    <Col sm={8}>
                                        <Input name="title" type={"text"} id="name"   defaultValue = {title} onChange = {this.changeState} required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Descripción
                                    </Label>
                                    <Col sm={8}>
                                        <Input name="description" type={"textarea"} id="description"  value = {description}  onChange = {this.changeState} required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Estado
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="select" name="state" id="stateSelect" value = {state} onChange = {this.changeState}  required>
                                            {stateOp}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Categoría
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="select" name="cat" id="catSelect" value = {cat} onChange = {this.changeState} required>
                                            {catsOp}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className={"justify-content-md-center mt-3"}>
                                    <Button color="primary">{(iid)?  'Modificar': "Crear"}</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

const CreateIdea = withAuthentication(CreateIdeaCom);

export default CreateIdea;