import React, {Component} from 'react';
import OverViewInd  from './overviewInd'
import OverViewOrg from './overviewOrg';
import {FaExclamationTriangle} from "react-icons/fa";
import {withAuthorization} from '../Session'
import {withAuthorization2} from '../Session';

/*
 classnames permite agregar clases a un component, condicionalmente
 osea le doy una condicion y si es verdadera agrega la clase si es falsa
 no la agrega
 */
import classnames from 'classnames';
import {Organizacion, Individual} from './UserForm';
import {GETUSER, REGISTER} from "../../Constants/Endpoint";
import withAuthentication from '../Session/withAuthentication';


import {TabContent, TabPane, Nav, NavItem, NavLink, Col, ButtonToolbar, ButtonGroup, Button, Row} from 'reactstrap'
import axios from "axios";
import * as ROUTES from "../../Constants/routes";
import Spinners from "../Wait";
import GenericError from "../Wait/GenericError";

class TabConfigManager extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            imagePreviewUrl: '',
            roles:[],
            org:false,
            wait:false,
            error:false
        };
        this.token = this.token.bind(this);
        this.setRole = this.setRole.bind(this);
    }

    errorStore = (error) => {
            this.setState({wait:false, error});
    };

    toggle(tab) {
        const {activeTab} = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    setRole(role) {
      const{fireBase} = this.props;
         return fireBase.user(fireBase.appAuth.currentUser.uid)
              .set({role}, {merge:true})
    };


    setClaims = (role) =>  {
        const {fireBase} = this.props;
        const customClaims = fireBase.callFunction('customClaims');
        return customClaims({role});
    };


    token() {
        const {fireBase} = this.props;
        return fireBase.token();
    };

    serverData = (formData, token) => {
        formData.append('uid', token);
        return axios({
            method: 'POST',
            url:  REGISTER,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data'},
        })
    };

    handleRadio = (event) => {
        console.log(event.target);
        if(event.target.value === "si") {
            this.setState({org:true});
        }else{
            this.setState({org:false});
        }
    };


    toggleWait = () => {
        const{wait} = this.state;
        this.setState({wait: !wait});
    };



    render() {
        const {activeTab, wait, imagePreviewUrl, org, error} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt =  "empty" src={imagePreviewUrl}/>);
        }
        return (
            <React.Fragment>
                {
                    (wait)?
                        <Spinners/>
                     :
                        <React.Fragment>
                            {
                                (error)?
                                    <GenericError error={error}/>
                                    :
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
                                                <Individual errorStore={this.errorStore} toggleWait={this.toggleWait} token={this.token} setClaims = {this.setClaims} serverData={this.serverData} setRole={this.setRole} handleRadio = {this.handleRadio}
                                                            org={org}
                                                />
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Organizacion  errorStore={this.errorStore} toggleWait={this.toggleWait} token={this.token} setClaims = {this.setClaims}  serverData={this.serverData} setRole={this.setRole} disable = {true}/>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}



class OverViewManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            wait:  true,
            source: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {fireBase} = this.props;
        const {fetched} = this.state;
        const promise = fireBase.token();
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        console.log("source");
        console.log(source);
        if(promise && !fetched ){
            console.log(fireBase.appAuth.currentUser);
            promise.then((uid) => {
                axios({
                    method: 'POST',
                    url: GETUSER,
                    data: {uid},
                    headers: {'Content-Type': 'application/json'},

                },{cancelToken: source.token}).then((response) => {
                    console.log(response.data);
                    if(response.data['status']){
                        if(this._isMounted) this.setState({...response.data, wait:false})
                    }else{
                        if(this._isMounted) this.setState({error: "No se pudo recolectar la informacion del usuario", wait:false})
                    }
                }).catch(function (thrown) {
                    if (axios.isCancel(thrown)) {
                        console.log('Request canceled', thrown.message);
                    } else {
                        // handle error
                    }
                });
            });
            this.setState({fetched:true, source});
        }
    }

    route = (goTo) =>{
        this.props.history.push(goTo);
    };

    componentWillUnmount() {
        console.log("Unmount");
        const{source} = this.state;
        console.log(source);
        source.cancel('Operation canceled by the user.');
        this._isMounted = false;
    }


    render() {
        const {wait, userType, error} = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col md={"12"}>
                        <ButtonToolbar className={"justify-content-end"}>
                            <ButtonGroup>
                                {/*<Button color={"info"} onClick={()  => {this.route(ROUTES.HOME)}}>Principal</Button>*/}
                                    <Button color={"info"} onClick={() => {this.route(ROUTES.LISTIDEA)}}>Listar Ideas</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                {
                    (wait)?
                        <Spinners/>
                        :
                        <React.Fragment>
                        {

                             (error)?
                            <React.Fragment>
                                <Row className={"justify-content-center"}>
                                    <Col sm={3}>
                                        <FaExclamationTriangle color={'red'} size={350} />
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center"}>
                                    <Col sm={3}>
                                        {error}
                                    </Col>
                                </Row>
                            </React.Fragment>:
                                 ((userType)?
                                    <OverViewInd {... this.state} route = {this.route}/>: <OverViewOrg {... this.state} route = {this.route}/> )
                        }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}





const condition = (role) => role === undefined | role === 0;
// const TabConfig = withAuthorization2(condition)(TabConfigManager);
const TabConfig = withAuthentication(TabConfigManager);
const  OverView = withAuthentication(OverViewManager);
export {TabConfig, OverView};


























