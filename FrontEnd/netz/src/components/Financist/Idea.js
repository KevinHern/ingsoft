import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import {FaHeart} from "react-icons/fa";
function Idea(props) {
    return (
        <Row className={"mt-5"}>
            <Col sm={{size: 4, offset:4}}>
                <ListGroup className={"justify-content-center"}>
                    <ListGroupItem>
                        <ListGroupItemHeading>{props.idea.title}</ListGroupItemHeading>
                        <ListGroupItemText>{props.idea.description}</ListGroupItemText>
                        <ListGroupItemText  className="text-info">{props.idea.firstname} {props.idea.lastname}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>{
                        (props.bookmarked)?
                            <FaHeart onClick={props.toggleHeart} color = {'red'}/>  :
                            <FaHeart onClick={props.toggleHeart}/>}
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

export default Idea;