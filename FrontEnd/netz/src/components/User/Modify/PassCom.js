import React from 'react';
import {Col, Label, Row} from "reactstrap";
import Input from "reactstrap/es/Input";
import {FaEyeSlash, FaEye} from "react-icons/fa";

function PassCom(props) {
    const{hidePass, onChange, toggleHide, name, label, pass} = props;
    return (
        <React.Fragment>
            <Col sm={{ size: 1}} >
                <Label className={'capitalize'}> {label}</Label>
            </Col>
            <Col sm ={{ size: 4}}>
                <Input name = {name}
                       type={(hidePass)? "password" : "text"}
                       onChange = {onChange}
                defaultValue={(pass)? pass: ""}
                />
            </Col>
            <Col sm ={{ size: 1}}>
                {(hidePass)?
                    <FaEyeSlash size={28} onClick={toggleHide}/>
                    :
                    <FaEye size={28}  onClick={toggleHide}/>
                }
            </Col>
        </React.Fragment>
    );
}

export default PassCom;