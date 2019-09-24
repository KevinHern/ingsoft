import React, {Component} from 'react';
import OverView from './overviewInd'
import {withAuthorization} from '../Session'
import {withAuthorization2} from '../Session';
/*
 classnames permite agregar clases a un component, condicionalmente
 osea le doy una condicion y si es verdadera agrega la clase si es falsa
 no la agrega
 */
import classnames from 'classnames';
import {Organizacion, Individual} from './UserForm';

import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import axios from "axios";
import {auth} from "firebase";
// import {withFirebase} from "../Firebase";

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
        this.setRole = this.setRole.bind(this);
    }

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
            url: 'http://localhost/ingsoft/src/insert.php',
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



    render() {
        const {activeTab} = this.state;
        const {imagePreviewUrl} = this.state;
        const {org} = this.state;
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
                        <Individual  token={this.token} setClaims = {this.setClaims} serverData={this.serverData} setRole={this.setRole} handleRadio = {this.handleRadio}
                            org={org}
                        />
                    </TabPane>
                    <TabPane tabId="2">
                        <Organizacion   token={this.token} setClaims = {this.setClaims}  serverData={this.serverData} setRole={this.setRole} disable = {true}/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const condition = (role) => role === undefined | role === 0;
const TabConfig = withAuthorization2(condition)(TabConfigManager);
export {TabConfig, OverView};


























