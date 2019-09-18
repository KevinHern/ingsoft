import React from 'react';
import Pagination from "reactstrap/es/Pagination";
import PaginationItem from "reactstrap/es/PaginationItem";
import PaginationLink from "reactstrap/es/PaginationLink";

function Item(props) {
    return(
        <PaginationItem>
            <PaginationLink first href="#">
                {props.no}
            </PaginationLink>
        </PaginationItem>
    )
}


function Paginator(props) {
    let pages =[];
    for(let i = 1; i<=props.page; i++){
        pages.push(<Item no={i}></Item>);
    }
    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            {
                pages
            }
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    );
}

export default Paginator;

