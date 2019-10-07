import React from 'react';
import {Button} from "reactstrap";

function List(props) {
    return (
        <React.Fragment>
            <tr>
                <th scope="row">1</th>
                <td>One</td>
                <td>
                    <Button color={"link"}>
                        ShowDetails
                    </Button>
                </td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td>One</td>
                <td>
                    <Button color={"link"}>
                        ShowDetails
                    </Button>
                </td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td>One</td>
                <td>
                    <Button color={"link"}>
                        ShowDetails
                    </Button>
                </td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td>One</td>
                <td>
                    <Button color={"link"}>
                        ShowDetails
                    </Button>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default List;