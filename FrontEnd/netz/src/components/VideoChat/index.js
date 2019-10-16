import React, {Component} from 'react';
import {withAuthentication} from '../Session';
import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {GETUSER} from "../../Constants/Endpoint";

class VideoChat extends Component {

    constructor(props){
        super(props);
        this.myVideoTag = React.createRef();
        this.friendsVideoTag = React.createRef();
        this.state = {
            userReady: false
        };
    }

    sendMessage = () => {

    };



    componentDidMount() {
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => {
                this.myVideoTag.current.srcObject = stream;
                this.friendsVideoTag.current.srcObject = stream;
            })
            .catch(console.log);
        const config = {
            'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'},
                {'urls': 'turn:numb.viagenie.ca', 'credential': 'netz123', 'username': 'netziscool@gmail.com'}]
        };
        const pc = new RTCPeerConnection(config);
        this.setState({pc});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {fireBase} = this.props;
        const {userReady, pc} = this.state;
        console.log(this.props);
        if(!userReady){
            const promise = fireBase.token();
            if(promise){
                promise.then((uid) => {
                    // console.log(uid);
                        pc.onicecandidate = (event => event.candidate? this.sendMessage(uid, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
                        pc.onaddstream = (event => this.friendsVideoTag.current.srcObject  = event.stream);
                });
                this.setState({userReady: true});
            }
        }
    }

    render() {
        const {fireBase} = this.props;
        const{friendsSrc} = this.state;
        // console.log(fireBase);
        // console.log(process.env.REACT_APP_SERVERS);
        return (
            <React.Fragment>
                <div></div>
                <Container>
                    <Row className={'justify-content-center'}>
                        <Col sm = "3">
                                <h1>Hello Chat</h1>
                        </Col>
                    </Row>
                    <Row  className={'justify-content-around mt-3'}>
                        <Col sm = "4" >
                            <h3>You</h3>
                            <video ref={this.myVideoTag}
                                   width={'320px'}
                                   height={'240px'}
                                   autoPlay
                                   title={'prueba'}/>

                        </Col>
                        <Col sm = "4">
                            <h3>Your Friend</h3>
                            <video ref={this.friendsVideoTag}
                                   width={'320px'}
                                   height={'240px'}
                                   autoPlay
                                   title={'prueba'}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withAuthentication(VideoChat);