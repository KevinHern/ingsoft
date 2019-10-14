import React, {Component} from 'react';
import PhoneItem from "../PhoneItem";
import TitleModify from "./TitleModify";

class PhoneList extends Component {

    constructor(props){
        super(props);
        this.state = {
            phoneList:[]
        };
    }

    componentDidMount() {
        const{phoneList} = this.props;
        this.setState({phoneList});
    }


    addExtra = () => {
        let {phoneList} = this.state;
        phoneList.push("");
        // console.log(phoneList);
        this.setState({phoneList});
    };

    removeExtra = (index) => {
        let {phoneList} = this.state;
        console.log(index);
        console.log(phoneList.splice(index, 1));
        console.log(phoneList);
        this.setState({phoneList});
    };

    render() {
        let {phoneList} = this.state;
        let {typeMode} = this.props;
        phoneList = phoneList.map((phone, index) => {
                if(index === 0) {
                    return <div  key = {index}></div>;
                }else{
                    return <PhoneItem key = {index} phone = {phone} idPhone = {index} changePhone = {this.onChange} removePhone = {this.removeExtra}/>
                }
            }
        );
        return (
            <div>
                <TitleModify typeMode = {typeMode}/>
            </div>
        );
    }
}


export  default PhoneList;