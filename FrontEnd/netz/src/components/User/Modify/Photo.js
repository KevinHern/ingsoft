import React, {Component} from 'react';
import {Media, Row, Col, Container, Button} from "reactstrap";
import {PHOTOEND, PROFILE, REGISTER, UPDATE_PROFILE} from "../../../Constants/Endpoint";
import ShowPhoto from '../ShowPhoto';
import Form from "reactstrap/es/Form";
import * as ROUTES from "../../../Constants/routes";
import axios from "axios";
import {withAuthentication} from '../../Session';
import Spinners from "../../Wait";

class Photo extends Component {

    constructor(props){
      super(props);
      this.state= {
            spinner: false
      };
      this._handleImageChange = this._handleImageChange.bind(this);
    };



    onSubmit = async (e) => {
        const {fireBase}  = this.props;
        const {typeMode} = this.props.match.params;
        try{
            const uid = await fireBase.token();
            const{photo} = this.state;
            const formData = new FormData;
            formData.append('uid', uid);
            formData.append('photo', photo);
            this.setState({spinner:true});
            const response = await axios({
                method: 'POST',
                url:  UPDATE_PROFILE,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'},
            });
            if(response.data['status']){
                console.log(`Photo was stored successfully`);
                setTimeout(() => {
                    this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/success`);
                }, 1500);
            }else{
                console.log(response.data.message);
                setTimeout(() => {
                    this.route(`${ROUTES.OVERVIEW}/${typeMode}/modify/failure`);
                }, 1500);
                console.log(`Photo Could not be saved`);
            }
            console.log(response);
        } catch(e) {
          console.log(e);
        }
    };

    route = (goTo) =>{
        this.props.history.push(goTo);
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
        const{value, route} = this.props;
        const{imagePreviewUrl, spinner} = this.state;
        return (
            <React.Fragment>
                {(spinner) ?
                    <Spinners/>
                    :
                    <React.Fragment>
                        <Row className={"justify-content-center"} >
                            <h2>Modificar Photo</h2>
                        </Row>
                        <Row className={"mt-5 justify-content-center"} >
                            <Col sm={6}>
                                <h2>Photo actual</h2>
                                <Media  className="ml-3 w-10" object src = {`${PHOTOEND}${value}/${PROFILE}`} alt = "logo"/>
                            </Col>
                            <Col sm={6}>
                                {/*<Container>*/}
                                {/*    <Row>*/}
                                {/*        <Col sm={8}> */}
                                <Form>
                                    <Row form>
                                        <ShowPhoto _handleImageChange = {this._handleImageChange}   imagePreviewUrl = {imagePreviewUrl}
                                                   labelSize ={2} photoSize={'wl-25'} inputSize={5} />
                                    </Row>
                                </Form>
                                {/*</Col>*/}
                                {/*    </Row>*/}
                                {/*</Container>*/}
                            </Col>
                        </Row>
                        <Row  className={"mt-5 justify-content-center"} >
                            <Col sm={2}>
                                <Button color={"primary"} type={'submit'} onClick={this.onSubmit}>Modificar</Button>
                            </Col>
                            <Col sm={2}>
                                <Button color={"danger"} onClick={() => route(ROUTES.OVERVIEW)}>Cancelar</Button>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default withAuthentication(Photo);