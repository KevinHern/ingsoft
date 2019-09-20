import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, Col, CustomInput, Media, Row, Alert} from "reactstrap";
import Input from "reactstrap/es/Input";
import React, {Component} from "react";
import axios from 'axios';
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
class OrganForm extends Component {


    constructor(props) {
        super(props);
        this.state= {
            logo: '',
            name: '',
            desc: "",
            country: "",
            addr: "",
            role: 0,
            error:false,

        };
        this._handleImageChange= this._handleImageChange.bind(this);
        this.modifyRole = this.modifyRole.bind(this);

    }

    _handleImageChange(e) {
        e.preventDefault();
        console.log( e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];



        reader.onloadend = () => {
            this.setState({
                logo: file,
                imagePreviewUrl: reader.result
            });

        };
        reader.readAsDataURL(file);
        console.log(reader);
    }




    handleSubmit = (e) => {
        e.preventDefault();
        const data =  {
            ...this.state,
            option:'org'
        };
        const pro = this.props.token();
        const formData = new FormData;
        for (const [key, value] of Object.entries(data)){
            // console.log(key);
            // console.log(value);
            if(!(key === "imagePreviewUrl")) formData.append(key, value);
        }

        // for (let key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }


        pro.then(token => {
            formData.append('uid', token);
            axios({
                method: 'POST',
                url: 'http://localhost/ingsoft/src/insert.php',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'},
            }).then((response) => {
                console.log(response);
                const data = response.data;
                if(data['status'] == 1){
                    console.log('success');
                    // this.history.push();
                }else {
                    this.setState({error:"Error en el servidor"});
                    console.log('failure');
                }
            });
        }).catch((error) => {
            console.log(error);
            this.setState({error:error.message});
        });
    };


    modifyRole(target) {
        console.log(target);
        const {role} = this.state;
        if(target.checked) {
            this.setState({ role: role + parseInt(target.value)});
        }else{
            this.setState({ role: role - parseInt(target.value)});
        }
    }

    onChange = event => {
        if(event.target.name === 'e2' | event.target.name === 'f2'){
            this.modifyRole(event.target);
        }else {
            this.setState({ [event.target.name]: event.target.value});
        }
        // console.log(this.state);
    };



    render() {
        const {imagePreviewUrl} = this.state;
        const {error} = this.state;
        return (
            <React.Fragment>
                {(error)? <Alert color={"danger"}>{error}</Alert>: null}
                <Form key={"formOrg"} id={"formOrg"} onSubmit={this.handleSubmit}>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="org">Nombre de la organización</Label>
                        <Col sm={5}>
                            <Input name="name" type={"text"} id="name"  onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center"}>
                        <Label sm={2} for="desc">Describa la organización</Label>
                        <Col sm={5}>
                            <Input name="desc" type={"textarea"} id="desc" onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="country">País</Label>
                        <Col sm={5}>
                            <Input name="country" type={"text"} id="country"  onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="direccion">Dirección</Label>
                        <Col sm={5}>
                            <Input name="addr" type={"text"} id="addr" onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row required className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="exampleCheckbox">Roles</Label>
                        <Col sm={5}>
                            <CustomInput type="checkbox" id="e2" name="e2"  label="Emprendedor"  onChange = {this.onChange} key={"e2"} value={1}/>
                            <CustomInput type="checkbox" id="f2" name="f2" label="Financista"  onChange = {this.onChange} key={"f2"} value={2}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="direccion">Logo</Label>
                        <Col sm={5}>
                            <CustomInput key={'logo'} type="file" onChange={this._handleImageChange} label="Logo"
                                         id="logo" name="logo" accept={"image/*"}/>
                            <Media>
                                <Media right>
                                    <Media id={"logoImg"} className="ml-3 w-25" object src={imagePreviewUrl}/>
                                </Media>
                            </Media>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>

                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Button color="primary">Aceptar</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
}

class IndForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            photo: '',
            bio: "",
            birth: "",
            nat: "",
            org: "",
            name1: "",
            name2: "",
            last1: '',
            last2: '',
            role: 0,
            error: false,
        };
        this._handleImageChange= this._handleImageChange.bind(this);
        this.modifyRole = this.modifyRole.bind(this);
    }


    modifyRole(target) {
        console.log(target);
        const {role} = this.state;
        if(target.checked) {
            this.setState({ role: role + parseInt(target.value)});
        }else{
            this.setState({ role: role - parseInt(target.value)});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data =  {
            ...this.state,
            option:'ind'
        };
        const pro = this.props.token();
        const formData = new FormData;
        for (const [key, value] of Object.entries(data)){
            // console.log(key);
            // console.log(value);
            if(!(key === "imagePreviewUrl")) formData.append(key, value);
        }

        // for (let key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        console.table(data);
        pro.then(token => {
            formData.append('uid', token);
            axios({
                method: 'POST',
                url: 'http://localhost/ingsoft/src/insert.php',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'},
            }).then((response) => {
                console.log(response);
                const data = response.data;
                 if(data['status'] == 1){
                     console.log('sucess');
                     // this.history.push();
                 }else {
                     this.setState({error:"Error en el servidor"});
                     console.log('failure');
                 }
            });
        }).catch((error) => {
            console.log(error);
            this.setState({error:error.message});
        });


    };

    onChange = event => {
        if(event.target.name === 'e1' | event.target.name === 'f1'){
            this.modifyRole(event.target);
        }else {
            this.setState({ [event.target.name]: event.target.value});
        }
        // console.log(this.state);
    };




    _handleImageChange(e) {
        e.preventDefault();
        console.log( e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                photo: file,
                imagePreviewUrl: reader.result
            });

        };
        reader.readAsDataURL(file);
        console.log(reader);
    }

    render() {
        const {imagePreviewUrl} = this.state;
        const {error} = this.state;
        return (
            <React.Fragment>
                {(error)? <Alert color={"danger"}>{error}</Alert>: null}
                <Form key={"formInd"} id={"formInd"} onSubmit={this.handleSubmit}>
                    <legend className={"mt-5 ml-3"}>
                        Nombres
                    </legend>
                    <Row form className={"mt-5"}>
                        <Col md={4} className={" mr-4 ml-4"}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="name1" sm={4}>Primero</Label>
                                <Col sm={8}>
                                    <Input name="name1" type={"text"} id="name1" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="name2" sm={4}>Segundo</Label>
                                <Col sm={8}>
                                    <Input name="name2" type={"text"} id="name2" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <legend className={"mt-5 ml-3"}>
                        Apellidos
                    </legend>
                    <Row form className={"mt-5"}>
                        <Col md={4} className={" mr-4 ml-4"}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="last1" sm={4}>Primero</Label>
                                <Col sm={8}>
                                    <Input name="last1" type={"text"} id="last1" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="last2" sm={4}>Segundo</Label>
                                <Col sm={8}>
                                    <Input name="last2" type={"text"} id="last2" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Col sm={4}>
                            <legend>Nacionalidad</legend>
                            <FormGroup row sm={12}>
                                <Col sm={12}>
                                    <Input name="nat" type={"text"} id="nat"  onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={4} className={"ml-5"}>
                            <legend>Fecha de Nacimiento</legend>
                            <FormGroup row sm={12}>
                                <Col sm={12}>
                                    <Input name="birth" type={"date"} id="birth" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Label sm={2} for="bio">Breve Biografia</Label>
                        <Col sm={5}>
                            <Input name="bio" type={"textarea"} id="bio" required onChange = {this.onChange}/>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Label sm={2} for="roles">Roles</Label>
                        <Col sm={5}>
                            <CustomInput type="checkbox" id="e1" name="e1" label="Emprendedor" key={"e1"} onChange = {this.onChange}/>
                            <CustomInput type="checkbox" id="f1" name="f1" label="Financista" key={"f1"} onChange = {this.onChange}/>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Label sm={2} for="direccion">Imagen de Perfil</Label>
                        <Col sm={5}>
                            <CustomInput type="file" key={'perfil'} onChange={this._handleImageChange}
                                         label="Imagen de Perfil" id="perfil" name="perfil" accept={"image/*"} required/>
                            <Media>
                                <Media right>
                                    <Media id={"perfilImg"} className="ml-3 w-25" object src={imagePreviewUrl}/>
                                </Media>
                            </Media>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <FormGroup tag="fieldset">
                            <legend>Esta afiliado con una organización?</legend>
                            <FormGroup check>
                                <Label check>
                                    <CustomInput type="radio" onChange={this.props.handleRadio} id="si" name="aff"
                                                 label="Si" value="si" key={"si"} />
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <CustomInput type="radio" id="no" name="aff" label="No" value="no" key={"no"}
                                                 onChange={this.props.handleRadio}/>
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Row>
                    {
                        (this.props.org) ? <Row form className={"ml-3"}>
                            <Label sm={2} for="affOrg">Organizacion Afiliada</Label>
                            <Col sm={5}>
                                <Input name="org" type={"text"} id="org" onChange = {this.onChange} required/>
                            </Col>
                        </Row> : ""
                    }
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Button color="primary">Aceptar</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
}

const Organizacion = withRouter(OrganForm);
const Individual = withRouter(withFirebase(IndForm));
export {Organizacion, Individual};





