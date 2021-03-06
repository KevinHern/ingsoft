import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, Col, CustomInput, Media, Row, Alert, FormFeedback} from "reactstrap";
import Input from "reactstrap/es/Input";
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import * as ROUTES from '../../Constants/routes';
import Container from "reactstrap/es/Container";
import PhoneItem from "./PhoneItem";
import axios from 'axios';
import {UPDATE_PHONE} from "../../Constants/Endpoint";
import ShowPhoto from "./ShowPhoto";

//Missing phone field
class OrganForm extends Component {


    constructor(props) {
        super(props);
        this.state= {
            logo: '',
            name: '',
            description: "",
            country: "",
            location: "",
            role: 0,
            error:false,
            phone: "",
            invalidRole: false
        };
        this._handleImageChange= this._handleImageChange.bind(this);
        this.modifyRole = this.modifyRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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


   async handleSubmit (e) {
        e.preventDefault();
        const {role} = this.state;
        if(!role) {
            this.setState({invalidRole:true});
            return;
        }
        const data =  {
            ...this.state,
            option:'org'
        };
       // Create form Data object
       const formData = new FormData;
       for (const [key, value] of Object.entries(data)){
           if(!(key === "imagePreviewUrl")) formData.append(key, value);
       }
        try{
            this.props.toggleWait();
            const promisedToken =  await this.props.token(); //Wait for this promise to resolve
            const[axiosRequest] = await Promise.all([this.props.serverData(formData, promisedToken)]);
            // const [axiosRequest, fireStoreRequest] = await Promise.all([this.props.serverData(formData, promisedToken),
            // this.props.setRole(data['role'])]) ; // This two in parallel, save to databases
            const response = axiosRequest.data; //Check response from axios for server status.
            // this.props.setClaims(data['role']).then((result) => {
            //     console.log(result);
            // });
            if(response['status'] === 1){
                // console.log('success');
                setTimeout(() => {
                    this.props.history.push(ROUTES.HOME);
                }, 750);
            }else {
                console.log(response);
                this.props.errorStore("Error en el servidor");
                // this.setState({error:"Error en el servidor"});
                // console.log('failure');
            }
        }catch(error){
            console.log(error);
            this.props.errorStore(error.message);
        }
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
        const {imagePreviewUrl, invalidRole} = this.state;
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
                            <Input name="description" type={"textarea"} id="description" onChange = {this.onChange} required/>
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
                            <Input name="location" type={"text"} id="location" onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="phone">Numero Telefonico</Label>
                        <Col sm={5}>
                            <Input name="phone" placeholder="0000-0000" type={"text"} id="phone" onChange = {this.onChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row required className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="exampleCheckbox">Roles</Label>
                        <Col sm={5}>
                            <Roles onChange = {this.onChange} e={"e2"} f={"f2"} invalid={invalidRole}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Label sm={2} for="direccion">Logo</Label>
                        <Col sm={5}>
                            <CustomInput key={'logo'} type="file" onChange={this._handleImageChange} label="Logo"
                                         id="logo" name="logo" accept={"image/*"} required/>
                            <Media>
                                <Media right>
                                    <Media id={"logoImg"} className="ml-3 w-25" object src={imagePreviewUrl}/>
                                </Media>
                            </Media>
                        </Col>
                    </FormGroup>
                    <FormGroup row className={"justify-content-md-center mt-3"}>
                        <Button color="primary" >Aceptar</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }

    //oldDotThen = () => {
    // const pro = this.props.token();
    // pro.then(token => {
    //      formData.append('uid', token);
    //      axios({
    //          method: 'POST',
    //          url: 'http://localhost/ingsoft/src/insert.php',
    //          data: formData,
    //          headers: { 'Content-Type': 'multipart/form-data'},
    //      }).then((response) => {
    //          console.log(response);
    //          const data = response.data;
    //          if(data['status'] == 1){
    //              console.log('success');
    //              this.props.history.push(ROUTES.HOME);
    //          }else {
    //              this.setState({error:"Error en el servidor"});
    //              console.log('failure');
    //          }
    //      });
    //  }).catch((error) => {
    //      console.log(error);
    //      this.setState({error:error.message});
    //  });
    //};
}

class IndForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            photo: '',
            biography: "",
            birthdate: "",
            nationality: "",
            organization: "",
            firstname: "",
            lastname: '',
            role: 0,
            error: false,
            phoneList: [""],
            invalidRole:false
        };
        this._handleImageChange= this._handleImageChange.bind(this);
        this.modifyRole = this.modifyRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

// Modify role according to whether it was checked or unchecked
    modifyRole(target) {
        console.log(target);
        const {role} = this.state;
        if(target.checked) {
            this.setState({ role: role + parseInt(target.value)});
        }else{
            this.setState({ role: role - parseInt(target.value)});
        }
    }


    storePhoneList = (uid) => {
        const{phoneList} = this.state;
        const phone = phoneList.map((phone, index) => {
            return {["phone"+index] : {number:phone}};
        });
        return axios({
            method: 'POST',
            url: UPDATE_PHONE,
            data:   {uid, phone},
            headers: { 'Content-Type': 'application/json'},
        });
    };
    //Send data to server
    async handleSubmit(e) {
        e.preventDefault();
        const data =  {
            ...this.state,
            option:'ind'
        };
        if(!data['role']) {
            this.setState({invalidRole:true});
            return;
        }
        const formData = new FormData;
        for (const [key, value] of Object.entries(data)){
            if(!(key === "imagePreviewUrl")) formData.append(key, value);
        }

        // console.log(data['role']);
        // console.log(data);

        //When you are ready to send phones make sure you won't send empty strings or duplicate phone numbers
        try{
            this.props.toggleWait();
            const promisedToken =  await this.props.token();
            const [axiosRequest, axiosRequestPhones] = await Promise.all(
                [this.props.serverData(formData, promisedToken),this.storePhoneList(promisedToken)]);
            // const [axiosRequest, fireStoreRequest, axiosRequestPhones] = await Promise.all([this.props.serverData(formData, promisedToken),
            //     this.props.setRole(data['role']), this.storePhoneList(promisedToken)]);
            // // const axiosRequest = await this.props.serverData(formData, promisedToken);
            // this.props.setClaims(data['role']).then((result) => {
            //     console.log(result);
            // });
            const response = axiosRequest.data;
            const phonesResponse = axiosRequestPhones.data;
            if(response['status']){
                if(phonesResponse['status']){
                    console.log('success');
                    setTimeout(()=> this.props.history.push(ROUTES.HOME), 750);
                }else{
                    this.props.errorStore("Los telefonos no se guardaron");
                    console.log(phonesResponse);
                 //   this.setState({error:"Falla al guardar los telefonos"});
                    console.log('Falla al guardar los telefonos');
                }
            } else {
                this.props.errorStore("No se guardo la informacion del usuario");
              //  this.setState({error:"Error en el servidor"});
                console.log('failure in register');
                console.log(response);
            }
        }catch(error){
            this.props.errorStore(error.message);
            console.log(error);
          //  this.setState({error:error.message});
        }


    };

    onChange = event => {
        if(event.target.name === 'e1' | event.target.name === 'f1'){
            this.modifyRole(event.target);
        }else if(event.target.name === 'phone' ){
           let {phoneList} = this.state;
            let index = event.target.dataset['phone'];
            console.log(phoneList);
            // if(this.checkPhone(event.target.value)){
            //
            // }else{
            //
            // }
            phoneList[index]= event.target.value;
            this.setState({phoneList});
        }else{
            this.setState({ [event.target.name]: event.target.value});
        }
        // console.log(this.state);
    };

    addExtra = () => {
        let {phoneList} = this.state;
        phoneList.push("");
        // console.log(phoneList);
        this.setState({phoneList});
    };

    removeExtra = (index) => {
        let {phoneList} = this.state;
        console.log(index);
        console.log(phoneList.splice(index, 1));
        console.log(phoneList);
        this.setState({phoneList});
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

    checkPhone = (number) => {
        const regex = /^\d{8}$/
        return number.match(regex);
    };

    render() {
        const {imagePreviewUrl, error, invalidRole} = this.state;
        let{phoneList} = this.state;
        phoneList = phoneList.map((phone, index) => {
                if(index === 0) {
                    return <div  key = {index}></div>;
                }else{
                    return <PhoneItem key = {index} phone = {phone} idPhone = {index} changePhone = {this.onChange} removePhone = {this.removeExtra}
                    />
                }
            }
        );
        return (
            <React.Fragment>
                {(error)? <Alert color={"danger"}>{error}</Alert>: null}
                <Form key={"formInd"} id={"formInd"} onSubmit={this.handleSubmit}>
                    <legend className={"mt-5 ml-3"}>
                        General
                    </legend>
                    <Row form className={"mt-5"}>
                        <Col md={4} className={" mr-4 ml-4"}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="firstname" sm={4}>Nombre</Label>
                                <Col sm={8}>
                                    <Input name="firstname" type={"text"} id="firstname" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup row className={"justify-content-md-center"}>
                                <Label for="lastname" sm={4}>Apellido</Label>
                                <Col sm={8}>
                                    <Input name="lastname" type={"text"} id="lastname" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Col sm={4}>
                            <legend>Nacionalidad</legend>
                            <FormGroup row sm={12}>
                                <Col sm={12}>
                                    <Input name="nationality" type={"text"} id="nationality"  onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={4} className={"ml-5"}>
                            <legend>Fecha de Nacimiento</legend>
                            <FormGroup row sm={12}>
                                <Col sm={12}>
                                    <Input name="birthdate" type={"date"} id="birthdate" onChange = {this.onChange} required/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Label sm={2} for="biography">Breve Biografia</Label>
                        <Col sm={5}>
                            <Input name="biography" type={"textarea"} id="biography" required onChange = {this.onChange}/>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <Label sm={2} for="roles">Roles</Label>
                        <Col sm={5}>
                            <Roles onChange = {this.onChange} e={"e1"} f={"f1"} invalid={invalidRole}/>
                        </Col>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <FormGroup row>
                            <Label sm={2} for="phone" className={"mr-5"}>Numero Telefonico</Label>
                            <Col sm={9}>
                                <Container>
                                    <Row>
                                        <Col sm={6}>
                                        <Input name="phone" type={"text"} id="phone" data-phone = {0} placeholder="0000-0000" onChange = {this.onChange} required/>
                                        </Col>
                                        <Col sm={6}>
                                            <Button  onClick={this.addExtra}>Extra Phone</Button>
                                        </Col>
                                    </Row>
                                    {
                                        phoneList
                                    }
                                </Container>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <ShowPhoto _handleImageChange = {this._handleImageChange} imagePreviewUrl = {imagePreviewUrl}
                        labelSize ={2} inputSize={5} photoSize={"w-25"}/>
                    </Row>
                    <Row form className={"mt-5 ml-3"}>
                        <FormGroup tag="fieldset" required>
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
                                <Input name="organization" type={"text"} id="org" onChange = {this.onChange} required/>
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

    //No Cloud Functions call here
    // oldDotThen = ()  => {
    //DotThen
    //Wait for promise
    // const pro =  await this.props.token();
    //console.table(data);
    // pro.then(token => {
    //     formData.append('uid', token);
    //     axios({
    //         method: 'POST',
    //         url: 'http://localhost/ingsoft/src/insert.php',
    //         data: formData,
    //         headers: { 'Content-Type': 'multipart/form-data'},
    //     }).then((response) => {
    //         console.log(response);
    //         const data = response.data;
    //          //Check status of Request
    //          if(data['status'] === 1){
    //              console.log('success');
    //              this.props.history.push(ROUTES.HOME);
    //          }else {
    //              this.setState({error:"Error en el servidor"});
    //              console.log('failure');
    //          }
    //     });
    // }).catch((error) => {
    //     console.log(error);
    //     this.setState({error:error.message});
    // });
    // };
}



const Roles = (props) =>{
    return (
        <React.Fragment>
            <CustomInput invalid={props.invalid} type="checkbox" id={props.e} name={props.e} label="Emprendedor" key={props.e} value={1} onChange = {props.onChange}>
                <FormFeedback>Debes escoger un role</FormFeedback>
            </CustomInput>
            <CustomInput invalid={props.invalid} type="checkbox" id={props.f} name={props.f} label="Financista" key={props.f}  value={2} onChange = {props.onChange}>
                <FormFeedback>Debes escoger un role</FormFeedback>
            </CustomInput>
        </React.Fragment>
    );
};


const Organizacion = withRouter(OrganForm);
const Individual = withRouter(IndForm);
export {Organizacion, Individual};





