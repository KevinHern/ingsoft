import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';

import SignUpPage from '../LoginPages/SignUp';
import SignInPage from '../LoginPages/SignIn';
import Header from '../Header';
import Footer from '../Footer';
import * as ROUTES from '../../Constants/routes';
import Landing from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage'
import React from 'react';
import {withAuthentication} from "../Session";
import {TabConfig, OverView, UpdateField} from "../User";
import {CreateIdea, ListIdea, Desc} from '../Idea';
import  Bandeja from '../Bandeja';
import './App.css';
import Container from "reactstrap/es/Container";
import NoMatch from "../NoMatch/NoMatch";
import {SearchIdeas} from '../Financist';
// import SignOutButton from '../LoginPages/SignOut';


const App = () => {
    return (
        <Container fluid className="min-vw-100 min-vh-100">
            <Router>
                        <Header/>
                            <Switch>
                                <Route exact path={ROUTES.LANDING} component={Landing} />
                                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                                <Route path={ROUTES.HOME} component = {HomePage}/>
                                <Route path={ROUTES.UCONFIG} component = {TabConfig}/>
                                <Route path={ROUTES.CREATEIDEA} component = {CreateIdea}/>
                                {/*I Just replaced exact in this route*/}
                                <Route path={ROUTES.OVERVIEW}  component = {OverView}/>
                                {/*<Route path={ROUTES.OVERVIEW+'/update/:typeMode/:field/:value'} component = {UpdateField}/>*/}
                                <Route path={ROUTES.LISTIDEA+'/:changedIdea?'} component = {ListIdea}/>
                                <Route path={ROUTES.LISTIDEA+'/:changedIdea?'} component = {ListIdea}/>
                                <Route path={ROUTES.DESCIDEA} component = {Desc}/>
                                <Route path={ROUTES.UPDATEIDEA} component = {CreateIdea}/>
                                <Route path={ROUTES.BANDEJA}  component = {Bandeja}/>
                                <Route path={ROUTES.FINANCIST}  component = {SearchIdeas}/>
                                <Route>
                                    <NoMatch/>
                                </Route>
                            </Switch>
                        <Footer/>
            </Router>
        </Container>
    );
};

export default withAuthentication(App);