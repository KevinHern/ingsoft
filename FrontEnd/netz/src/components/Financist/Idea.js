import React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import ListGroupItemHeading from "reactstrap/es/ListGroupItemHeading";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import {FaStar} from "react-icons/fa";
import {IoIosChatboxes} from "react-icons/io";
import PropTypes  from 'prop-types';
import Container from "reactstrap/es/Container";
function Idea(props) {
    const{isBookmarked, title, description, firstname, lastname, iid, uid} = props.idea;
    const{bookMarked, chat, newBook, addChatRequests} = props;
    const condition = ( bookMarked| isBookmarked | newBook.includes(iid));
    return (
        <Row className={"mt-5"}>
            <Col sm={{size: 4, offset:4}}>
                <ListGroup className={"justify-content-center"}>
                    <ListGroupItem>
                        <ListGroupItemHeading>{title}</ListGroupItemHeading>
                        <ListGroupItemText>{description}</ListGroupItemText>
                        <ListGroupItemText  className="text-info">{firstname} {lastname}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem tag="button" action>
                        <Container>
                            <Row>
                                <Col sm={"6"}>

                                {
                                (condition)?
                                    <FaStar onClick={() => {props.toggleStar(iid, 0)}} color = {'#FFD700'}/>  :
                                    <FaStar onClick={() => {props.toggleStar(iid, 1)}} />
                                }
                                </Col>
                                {   (chat)?
                                    <Col sm={"6"}>
                                        <IoIosChatboxes onClick = {() => {addChatRequests(uid, iid, title)}}/>
                                    </Col>
                                    :
                                    null
                                }
                            </Row>
                        </Container>
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

Idea.propTypes = {
    idea: PropTypes.shape({
        isBookmarked: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        iid: PropTypes.number
    }),
    newBook:PropTypes.arrayOf(PropTypes.number),
    bookMarked: PropTypes.bool
};
export default Idea;