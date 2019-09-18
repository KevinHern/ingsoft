import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import {Button, Col, CustomInput, Media, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import React, {Component} from "react";

import InputGroup from "reactstrap/es/InputGroup";



class Organizacion extends Component {


    constructor(props) {
        super(props);
        this.state= {
            file: '',
        };
        this._handleImageChange= this._handleImageChange.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();
        console.log( e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];



        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });

        };
        reader.readAsDataURL(file);
        console.log(reader);
    }





    render() {
        const {imagePreviewUrl} = this.state;
        return (
            <Form key={"org"} id={"org"} onSubmit={this.props.handleSubmit}>
                <FormGroup row className={"justify-content-md-center mt-3"}>
                    <Label sm={2} for="org">Nombre de la organización</Label>
                    <Col sm={5}>
                        <Input name="name" type={"text"} id="name" required/>
                    </Col>
                </FormGroup>
                <FormGroup row className={"justify-content-md-center"}>
                    <Label sm={2} for="desc">Describa la organización</Label>
                    <Col sm={5}>
                        <Input name="desc" type={"textarea"} id="desc" required/>
                    </Col>
                </FormGroup>
                <FormGroup row className={"justify-content-md-center mt-3"}>
                    <Label sm={2} for="country">País</Label>
                    <Col sm={5}>
                        <Input name="country" type={"text"} id="country" required/>
                    </Col>
                </FormGroup>
                <FormGroup row className={"justify-content-md-center mt-3"}>
                    <Label sm={2} for="direccion">Dirección</Label>
                    <Col sm={5}>
                        <Input name="addr" type={"text"} id="addr" required/>
                    </Col>
                </FormGroup>
                <FormGroup row required className={"justify-content-md-center mt-3"}>
                    <Label sm={2} for="exampleCheckbox">Roles</Label>
                    <Col sm={5}>
                        <CustomInput type="checkbox" id="e2" name="e2" label="Emprendedor" key={"e2"}/>
                        <CustomInput type="checkbox" id="f2" name="f2" label="Financista" key={"f2"}/>
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
        );
    }
}

class Individual extends Component {

    constructor(props) {
        super(props);
        this.state= {
            file: '',
        };
        this._handleImageChange= this._handleImageChange.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();
        console.log( e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];



        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });

        };
        reader.readAsDataURL(file);
        console.log(reader);
    }

    render() {
        const {imagePreviewUrl} = this.state;
        return (
            <Form key={"ind"} id={"ind"} onSubmit={this.props.handleSubmit}>
                <legend className={"mt-5 ml-3"}>
                    Nombres
                </legend>
                <Row form className={"mt-5"}>
                    <Col md={4} className={" mr-4 ml-4"}>
                        <FormGroup row className={"justify-content-md-center"}>
                            <Label for="name1" sm={4}>Primero</Label>
                            <Col sm={8}>
                                <Input name="name1" type={"text"} id="name1"/>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup row className={"justify-content-md-center"}>
                            <Label for="name2" sm={4}>Segundo</Label>
                            <Col sm={8}>
                                <Input name="name2" type={"text"} id="name2"/>
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
                                <Input name="last1" type={"text"} id="last1"/>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup row className={"justify-content-md-center"}>
                            <Label for="last2" sm={4}>Segundo</Label>
                            <Col sm={8}>
                                <Input name="last2" type={"text"} id="last2"/>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form className={"mt-5 ml-3"}>
                    <Col sm={4}>
                        <legend>Nacionalidad</legend>
                        <FormGroup row sm={12}>
                            <Col sm={12}>
                                <Input name="" type={"text"} id="name1"/>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={4} className={"ml-5"}>
                        <legend>Fecha de Nacimiento</legend>
                        <FormGroup row sm={12}>
                            <Col sm={12}>
                                <Input name="" type={"date"} id="birth"/>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form className={"mt-5 ml-3"}>
                    <Label sm={2} for="desc">Breve Biografia</Label>
                    <Col sm={5}>
                        <Input name="bio" type={"textarea"} id="bio"/>
                    </Col>
                </Row>
                <Row form className={"mt-5 ml-3"}>
                    <Label sm={2} for="exampleCheckbox">Roles</Label>
                    <Col sm={5}>
                        <CustomInput type="checkbox" id="e1" name="e1" label="Emprendedor" key={"e1"}/>
                        <CustomInput type="checkbox" id="f1" name="f1" label="Financista" key={"f1"}/>
                    </Col>
                </Row>
                <Row form className={"mt-5 ml-3"}>
                    <Label sm={2} for="direccion">Imagen de Perfil</Label>
                    <Col sm={5}>
                        <CustomInput type="file" key={'perfil'} onChange={this._handleImageChange}
                                     label="Imagen de Perfil" id="perfil" name="perfil" accept={"image/*"}/>
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
                                             label="Si" value="si" key={"si"}/>
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
                            <Input name="affOrg" type={"text"} id="affOrg"/>
                        </Col>
                    </Row> : ""
                }
                <FormGroup row className={"justify-content-md-center mt-3"}>
                    <Button color="primary">Aceptar</Button>
                </FormGroup>
            </Form>
        );
    }
}


export {Organizacion, Individual};




{/*<FormGroup  row className={"justify-content-md-center"}>*/}
{/*    <Label  sm={2}for = "desc">Describa la organización</Label>*/}
{/*    <Col sm={5}>*/}
{/*        <Input name = "desc" type={"textarea"} id ="dec"/>*/}
{/*    </Col>*/}
{/*</FormGroup>*/}
{/*<FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*    <Label sm={2} for = "country">País</Label>*/}
{/*    <Col sm={5}>*/}
{/*        <Input name = "country" type={"text"} id ="country"/>*/}
{/*    </Col>*/}
{/*</FormGroup>*/}
{/*<FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*    <Label sm={2} for = "direccion">Dirección</Label>*/}
{/*    <Col sm={5}>*/}
{/*        <Input name = "addr" type={"text"} id ="addr"/>*/}
{/*    </Col>*/}
{/*</FormGroup>*/}
{/*<FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*    <Label sm={2} for = "direccion">Logo</Label>*/}
{/*    <Col sm={5}>*/}
{/*        <CustomInput type="file" onChange={props._handleImageChange}  label = "Logo" id="exampleCustomFileBrowser" name="logo" accept={"image/*"} />*/}
{/*        <Media>*/}
{/*            <Media right>*/}
{/*                <Media  className="ml-3 w-25" object src = {props.imagePreviewUrl}/>*/}
{/*            </Media>*/}
{/*        </Media>*/}
{/*    </Col>*/}
{/*</FormGroup>*/}
{/*<FormGroup   row className={"justify-content-md-center mt-3"}>*/}

{/*</FormGroup>*/}
{/*<FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*    <Button color ="primary">Aceptar</Button>*/}
{/*</FormGroup>*/}






//
{/*<Row form className={"mt-5"}>*/}
{/*    <Col md={4} className={" mr-4 ml-4" } >*/}
{/*        <FormGroup row className={"justify-content-md-center"}>*/}
{/*            <Label for = "name1" sm={4}>Primer Nombre</Label>*/}
{/*            <Col sm={8}>*/}
{/*                <Input name = "name1" type={"text"} id ="name1"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*    </Col>*/}
{/*    <Col md={4} >*/}
{/*        <FormGroup  row  className={"justify-content-md-center"} >*/}
{/*            <Label for = "name2" sm={4}>Segundo Nombre</Label>*/}
{/*            <Col sm={8}>*/}
{/*                <Input name = "name2" type={"text"} id ="name2"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*    </Col>*/}
{/*</Row>*/}
