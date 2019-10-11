import React, {Component} from 'react';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, Col, CustomInput, Media, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import {CATEGORY, INSERT} from "../../Constants/Endpoint";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import withAuthentication from '../Session/withAuthentication.js'


class CreateIdeaCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            title: '',
            description: '',
            cat: 0,
        };
        this.onSubmit = this.onSubmit.bind(this);
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
        })

    }

    changeState = (e) => {
        // console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value})
    };

    async onSubmit(e){
        e.preventDefault();
        console.log(this.props);
        const {fireBase} = this.props;
        const { title, description, cat} = this.state;
        const token =  await fireBase.token();
        const formData = new FormData;
        formData.append('option', 'idea');
        formData.append('uid', token);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', cat);
        formData.append('state', "1");
        axios({
            url: INSERT,
            method: 'post',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data'},
        }).then(response => {
            console.log(response.data);
            if(response.data['status']){
                this.props.history.push('/listidea');
            }else{
                console.log('error en el servidor');
            }
        })
    }

    render() {
        const {cats}  = this.state;
        const catsOp = cats.map((cat) => {
            return <option key = {cat.name} value = {cat.id}>{cat.name}</option>
        });
        return (
            <React.Fragment>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}}>.
                            <h1>Crear Idea</h1>
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
                                        <Input name="title" type={"text"} id="name" onChange = {this.changeState}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Descripción
                                    </Label>
                                    <Col sm={8}>
                                        <Input name="description" type={"textarea"} id="name" onChange = {this.changeState}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>
                                        Categoría
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="select" name="cat" id="exampleSelect" onChange = {this.changeState}>
                                            {catsOp}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className={"justify-content-md-center mt-3"}>

                                    <Button color="primary">{(this.props.message)?  this.props.message: "Crear"}</Button>
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