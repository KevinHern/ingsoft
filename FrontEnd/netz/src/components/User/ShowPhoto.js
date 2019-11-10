import React from 'react';
import Label from "reactstrap/es/Label";
import {Col, CustomInput, Media} from "reactstrap";
import PropTypes from 'prop-types';


function ShowPhoto(props) {
    const{_handleImageChange, imagePreviewUrl, labelSize, photoSize, inputSize} = props;
    return (
        <React.Fragment>
            <Label sm={labelSize} for="imagen">Imagen de Perfil</Label>
            <Col sm={inputSize}>
                <CustomInput type="file" key={'perfil'} onChange={_handleImageChange}
                             label="Imagen de Perfil" id="perfil" name="perfil" accept={"image/*"} required/>
                <Media>
                    <Media right>
                        <Media id={"perfilImg"} className={`ml-3 img-fluid`} object src={imagePreviewUrl}/>
                    </Media>
                </Media>
            </Col>
        </React.Fragment>
    );
}


//What is an imagePreviewUrl?
ShowPhoto.proTypes = {
    _handleImageChange: PropTypes.func,
    labelSize: PropTypes.number,
    inputSize:PropTypes.number,
    imagePreviewUrl: PropTypes.node
};
export default ShowPhoto;