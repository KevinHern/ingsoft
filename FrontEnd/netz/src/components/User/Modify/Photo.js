import React, {Component} from 'react';
import {Media, Row, Col, Container, Button} from "reactstrap";
import {PHOTOEND, PROFILE} from "../../../Constants/Endpoint";
import ShowPhoto from '../ShowPhoto';
import Form from "reactstrap/es/Form";
import * as ROUTES from "../../../Constants/routes";

class Photo extends Component {

    constructor(props){
      super(props);
      this.state= {

      };
      this._handleImageChange = this._handleImageChange.bind(this);
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
        const{imagePreviewUrl} = this.state;
        return (
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
                        <Button color={"primary"}>Modificar</Button>
                    </Col>
                    <Col sm={2}>
                        <Button color={"danger"} onClick={() => route(ROUTES.OVERVIEW)}>Cancelar</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Photo;