import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import {FaHeart} from "react-icons/fa";
function Idea(props) {
    const{isBookmarked, title, description, firstname, lastname, iid} = props.idea;
    const{newBook, removeBook} = props;
    const condition = (isBookmarked | newBook.includes(iid)) & !(removeBook.includes(iid));
    return (
        <Row className={"mt-5"}>
            <Col sm={{size: 4, offset:4}}>
                <ListGroup className={"justify-content-center"}>
                    <ListGroupItem>
                        <ListGroupItemHeading>{title}</ListGroupItemHeading>
                        <ListGroupItemText>{description}</ListGroupItemText>
                        <ListGroupItemText  className="text-info">{firstname} {lastname}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>{
                        (condition)?
                            <FaHeart onClick={() => {props.toggleHeart(iid, 0)}} color = {'red'}/>  :
                            <FaHeart onClick={() => {props.toggleHeart(iid, 1)}} />}
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

export default Idea;