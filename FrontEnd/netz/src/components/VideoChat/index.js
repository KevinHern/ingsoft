import React, {Component} from 'react';
import {withAuthentication} from '../Session';
import {Container, Row, Col} from "reactstrap";
import {Button} from 'reactstrap';
import axios from "axios";

/**
 * Component for liveChat communication
 * https://www.oreilly.com/library/view/high-performance-browser/9781449344757/ch18.html
 * https://www.oreilly.com/library/view/high-performance-browser/9781449344757/ch03.html#NATS
 */

class VideoChat extends Component {


    /**
     * Constructor with default state
     * Refs are created to work with the video stream
     * @param props
     */
    constructor(props){
        super(props);
        this.myVideoTag = React.createRef();
        this.friendsVideoTag = React.createRef();
        this.state = {
            userReady: false,
            streaming: false,
            uid: ''
        };
    }

    /**
     * Push data to firebase real-time database
     * The push method on the database creates a random id for the object placed.
     * Data is always removed after placement
     * @param uid -> Will be pushed to the database to identify the sender.
     * @param data -> Session Description sent to peer
     */
    sendMessage = (uid, data) => {
        const{fireBase} = this.props;
        // console.log(uid, data);
        const message = fireBase.rdb.push(({sender:uid, message:data}));
        message.remove();

    };

    /**
     * Method to read data
     * Here we set the remove session description and we add the ICE candidates (ip, port)
     * so we can communicate with our peer.
     * @param data
     * @param uid
     */
    readMessage = (data, uid) => {
       const {pc} = this.state;
       console.log('uid');
       console.table(data);
      const msg = JSON.parse(data.val().message);
      const sender = data.val().sender;
      console.log(`sender ${sender}`);
      console.log(` uid ${uid}` );
      console.log('message');
      console.table(msg);
      if(sender !== uid){
        if(msg.ice !== undefined){
            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        }else if(msg.sdp.type === 'offer') {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => pc.createAnswer())
                .then(answer => pc.setLocalDescription(answer))
                .then(() => this.sendMessage(uid, JSON.stringify({'sdp': pc.localDescription})))
        }else if(msg.sdp.type === 'answer') {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
      }
    };

    /**
     * We stop streaming of both videos
     */
    stopVideo = () => {
        const{streaming} = this.state;
        if(streaming){
            let stream = this.myVideoTag.current.srcObject;
            let streamFriend = this.friendsVideoTag.current.srcObject;
            let tracks = stream.getTracks();
            tracks.forEach(function(track) {
                track.stop();
            });
            if(streamFriend){
                let tracksFriends = streamFriend.getTracks();
                tracksFriends.forEach(function(track) {
                    track.stop();
                });
            }
            this.myVideoTag.current.srcObject = null;
            this.friendsVideoTag.current.srcObject = null;
            this.setState({streaming: false});
        }
    };

    /**
     * Ask user permission to access their media, and we add the stream to the RTCPeerConnection
     */
    showVideo = () => {
        const{pc, streaming, uid} = this.state;
        if(!streaming) {
            navigator.mediaDevices
                .getUserMedia({video: true})
                .then(stream => {
                    this.myVideoTag.current.srcObject = stream;
                    // this.friendsVideoTag.current.srcObject = stream;
                    pc.addStream(stream);//Not sure if this should go here
                });
        }
        this.setState({streaming:true});
    };

    /**
     * Creates the offer object and we set our localDescription
     * the ice agent begins its work.
     * Once we create the offer, we send our local description to the other user.
     */
    showOtherVideo = () => {
        const {pc, uid} = this.state;
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer) )
            .then(() =>
                this.sendMessage(uid, JSON.stringify({'sdp': pc.localDescription})) );
    };


    /**
     * We create the RTCPeerConnection, with the stun and turn servers we will use.
     */
    componentDidMount() {
        const config = {
            'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'},
                {'urls': 'turn:numb.viagenie.ca', 'credential': 'netz123', 'username': 'netziscool@gmail.com'}]
        };
        const pc = new window.RTCPeerConnection(config);
        this.setState({pc});
        // console.log(process.env.REACT_APP_STORAGE_BUCKET);
    }


    /**
     * Once user is available
     *  We set callbacks for onicecandiate, onaddstream and
     *  we set a callback for the real time database  to read messages
     *  once their are added
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {fireBase} = this.props;
        const {userReady, pc} = this.state;
        // console.log(this.props);
        if(!userReady){
            const promise = fireBase.token();
            if(promise){
                promise.then((uid) => {
                        pc.onicecandidate = (event => {
                            if(event.candidate) {
                                this.sendMessage(uid, JSON.stringify({'ice': event.candidate}));
                                console.log(event.candidate);
                            }else{
                                console.log(event);
                                console.log("Sent All Ice")
                            }
                        } );
                        pc.onaddstream = (event =>{
                            console.log("friends stream");
                            console.log(event.stream);
                            this.friendsVideoTag.current.srcObject  = event.stream;
                        } );
                        fireBase.rdb.on('child_added', (data) => this.readMessage(data, uid));
                       this.setState({uid});
                });
                this.setState({userReady: true});
            }
        }
    }


    render() {
        return (
            <React.Fragment>
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
                    <Row className={'justify-content-center'}>
                        <Col sm={"2"}>
                            <Button color={'primary'} onClick={this.showVideo}>VideoChat</Button>
                        </Col>
                        <Col sm={"2"}>
                             <Button color={'primary'} onClick={this.showOtherVideo}>Start VideoChat</Button>
                         </Col>
                        <Col sm={"2"}>
                            <Button color={'primary'} onClick={this.stopVideo}>Stop VideoChat</Button>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withAuthentication(VideoChat);


