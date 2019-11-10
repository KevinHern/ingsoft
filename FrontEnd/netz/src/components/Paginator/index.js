import React from 'react';
import Pagination from "reactstrap/es/Pagination";
import PaginationItem from "reactstrap/es/PaginationItem";
import PaginationLink from "reactstrap/es/PaginationLink";
import PropTypes from 'prop-types';

function Item(props) {
    // console.log(props.no);
    return(
        <PaginationItem active = {props.active} onClick = {() => {
                if(props.currentPage !== props.no) {
                    props.onPageMove(props.no)
                }
        }}>
            <PaginationLink   >
                {props.no}
            </PaginationLink>
        </PaginationItem>
    )
}

Item.propTypes = {
  active: PropTypes.bool,
  currentPage: PropTypes.number,
  onPageMove: PropTypes.func,
  no: PropTypes.number
};


function Paginator(props) {
    let pages =[];
    const {initPage, currentPage, max, perTag} = props;
    for(let i = initPage; i<initPage+perTag; i++){
        if(max < i) {
            break;
        }
        if(currentPage === i) {
            pages.push(<Item no={i} key = {i}  active = {true} currentPage = {currentPage} onPageMove = {props.onPageMove}/>);
        }else{
            pages.push(<Item no={i} key = {i}  active = {false}  currentPage = {currentPage} onPageMove = {props.onPageMove}/>);
        }
    };
    return (
        <Pagination>
            <PaginationItem disabled={!(initPage-1)} onClick={(e) => {props.onArrowMove(e, 'first')}}>
                <PaginationLink first  />
            </PaginationItem>
            <PaginationItem  disabled={currentPage===1} onClick={ (e) => {props.onArrowMove(e, 'previous')}}>
                <PaginationLink previous   />
            </PaginationItem>
            {
                pages
            }
            <PaginationItem disabled={currentPage === max} onClick={ (e) => {props.onArrowMove(e, 'next')}}>
                <PaginationLink next  />
            </PaginationItem>
            <PaginationItem   disabled={initPage+perTag > max || currentPage === max} onClick={ (e) => {props.onArrowMove(e, 'last')}}>
                <PaginationLink last/>
            </PaginationItem>
        </Pagination>
    );
}


Paginator.propTypes = {
    initPage : PropTypes.number,
    currentPage : PropTypes.number,
    max : PropTypes.number,
    perTag : PropTypes.number,
    onArrowMove: PropTypes.func,
    onPageMove: PropTypes.func
};


export default Paginator;

