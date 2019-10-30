import React, {Component} from 'react';
import {Button} from "reactstrap";
import PropTypes from 'prop-types';
class List extends Component {

    constructor(props){
        super(props)
    }
    render() {
        let {ideas} = this.props;
        ideas = ideas.map((idea, index) => {
                return (
                    <tr key={idea.iid+idea.title}>
                        <th scope="row" >{index+1}</th>
                        <td>{idea.title}</td>
                        <td>
                            <Button color={"link"} onClick={() => {this.props.showDetails(idea.iid)}}>
                                ShowDetails
                            </Button>
                        </td>
                </tr>)
        });
        return (<React.Fragment>
                    {ideas}
        </React.Fragment>)
    }
}


List.propTypes = {
    ideas: PropTypes.arrayOf(PropTypes.shape({
            iid: PropTypes.number,
            title: PropTypes.string,
    })),
    showDetails: PropTypes.func
};

export default List;