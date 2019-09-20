import React, {Component} from 'react';
import OverView from './overview'
/*
 classnames permite agregar clases a un component, condicionalmente
 osea le doy una condicion y si es verdadera agrega la clase si es falsa
 no la agrega
 */
import classnames from 'classnames';
import {Organizacion, Individual} from './UserForm';

import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import {withFirebase} from "../Firebase";

class TabConfigManager extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            imagePreviewUrl: '',
            roles:[],
            org:false,
        };
        this.token = this.token.bind(this);
    }

    toggle(tab) {
        const {activeTab} = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    async token() {
        const {fireBase} = this.props;
        const token = await fireBase.token();
        return token;
    }




    handleRadio = (event) => {
        console.log(event.target);
        if(event.target.value === "si") {
            this.setState({org:true});
        }else{
            this.setState({org:false});
        }
    };



    render() {
        const {activeTab} = this.state;
        const {imagePreviewUrl} = this.state;
        const {org} = this.state;
        console.log("Url" + imagePreviewUrl);
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt =  "empty" src={imagePreviewUrl}/>);
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Individual
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Organización
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab = {activeTab}>
                    <TabPane tabId="1">
                        <Individual  token={this.token} handleRadio = {this.handleRadio}
                            org={org}
                        />
                    </TabPane>
                    <TabPane tabId="2">
                        <Organizacion   token={this.token} disable = {true}/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const TabConfig = withFirebase(TabConfigManager);

export {TabConfig, OverView};

























// Form onSubmit = {this.onSubmit}  key={"SignUp"}   className="align-middle">
//     <FormGroup row className="justify-content-md-center mt-3">
//     <h1>SignUp</h1>
// </FormGroup>
// <FormGroup row className="justify-content-md-center">
// <Label for="userName" sm={2}>Nombre</Label>
// <Col sm={5}>
// <Input onChange = {this.onChange} type="type" name="username" id="username"/>
// </Col>
// </FormGroup>
// <FormGroup row className="justify-content-md-center">
// <Label for = "email" sm={2}>Email</Label>
// <Col sm={5}>
// <Input onChange = {this.onChange} type="email" name="email" id="email"/>
// </Col>
// </FormGroup>
// <FormGroup row className="justify-content-md-center">
// <Label for = "password" sm={2}>Password</Label>
// <Col sm={5}>
// <Input onChange = {this.onChange} type="password" name="passwordOne" id="passwordOne"/>
// </Col>
// </FormGroup>
// <FormGroup row className="justify-content-md-center">
// <Label for = "password" sm={2}>Retype Password</Label>
// <Col sm={5}>
// <Input onChange = {this.onChange} type="password" name="passwordTwo" id="passwordTwo"/>
// </Col>
// </FormGroup>
// <FormGroup row className="justify-content-md-center">
// {/*<ButtonGroup className="d-flex justify-content-center" >*/}
// {/*    <Button color="primary" disabled={isInvalid}>Sign Up</Button>*/}
// {/*    <GoogleSign message = {"Sign Up with Google"}/>*/}
// {/*</ButtonGroup>*/}
// <ButtonGroup>
// <Button  disabled={isInvalid} type = "Submit" className="mr-3" color = "primary">
// Sign In</Button>
// <FormText color="muted">
// Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
// </FormText>
// </ButtonGroup>
// </FormGroup>
// {/*<FormGroup row className="justify-content-md-center">*/}
// {/*    <GoogleSign message = { "Sign Up with Google"}/>*/}
// {/*</FormGroup>*/}
// {error && <p>error.message</p>}
// </Form>



{/*<TabPane tabId="2">*/}
{/*    <Form key={"org"} onSubmit={this.handleSubmit}>*/}
{/*        <FormGroup  row className={"justify-content-md-center mt-3"}>*/}
{/*            <Label sm={2}  for = "org">Nombre de la organización</Label>*/}
{/*            <Col sm={5}>*/}
{/*                <Input name = "name" type={"text"} id ="name"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*        <FormGroup  row className={"justify-content-md-center"}>*/}
{/*            <Label  sm={2}for = "desc">Describa la organización</Label>*/}
{/*            <Col sm={5}>*/}
{/*                <Input name = "desc" type={"textarea"} id ="dec"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*        <FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*            <Label sm={2} for = "country">País</Label>*/}
{/*            <Col sm={5}>*/}
{/*                <Input name = "country" type={"text"} id ="country"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*        <FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*            <Label sm={2} for = "direccion">Dirección</Label>*/}
{/*            <Col sm={5}>*/}
{/*                <Input name = "addr" type={"text"} id ="addr"/>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*        <FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*            <Label sm={2} for = "direccion">Logo</Label>*/}
{/*            <Col sm={5}>*/}
{/*                <CustomInput type="file" onChange={this._handleImageChange}  label = "Logo" id="exampleCustomFileBrowser" name="logo" accept={"image/*"} />*/}
{/*                <Media>*/}
{/*                    <Media right>*/}
{/*                        <Media  className="ml-3 w-25" object src = {imagePreviewUrl}/>*/}
{/*                    </Media>*/}
{/*                </Media>*/}
{/*            </Col>*/}
{/*        </FormGroup>*/}
{/*        <FormGroup   row className={"justify-content-md-center mt-3"}>*/}

{/*        </FormGroup>*/}
{/*        <FormGroup   row className={"justify-content-md-center mt-3"}>*/}
{/*            <Button color ="primary">Aceptar</Button>*/}
{/*        </FormGroup>*/}
{/*    </Form>*/}
