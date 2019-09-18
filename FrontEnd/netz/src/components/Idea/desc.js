import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Row, Table} from "reactstrap";
import Container from "reactstrap/es/Container";
import Paginator from "../Paginator";

class Desc extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            cat: "",
            std: "",
            cant: "",
            int: []
        }
    }

    fetchInfo = () => {
      this.setState({
          title: "Hello",
          desc: "desc",
          cat:"Known",
          std:"a",
          cant:5,
          int:[{name:"Robert"}, {name:"Alejandro"}]
      })
    };


    componentDidMount() {
        this._isMounted = true;
        this.fetchInfo();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {title, desc, cat, std, cant, int} = this.state;
        let users = int.map((i) => {
            return <tr>
                <td>{i.name}</td>
                <td><Button color={'link'}>Detalles</Button></td>
            </tr>;
        });

        return (
            <React.Fragment>
                    <Row className={"justify-content-end"}>
                        <Col sm={4}>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button color={"info"}>Editar</Button>
                                    <Button color={"info"}>Eliminar</Button>
                                    <Button color={"info"}>Cuenta</Button>
                                    <Button color={"info"}>Principal</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className={"mb-3"}>
                        <Col sm="12" md={{size: 6, offset: 2}}>.
                            <h1>Title:  {title}</h1>
                        </Col>
                    </Row>
                    <Row  >
                        <Col sm="2"  md={{size: 2, offset: 2}}>
                            <h4>Descripcion</h4>
                            <p>{desc + " asdfasdfasdfasdfasdf"}</p>
                        </Col>
                        <Col sm="2" md={{size: 2, offset: 2}}>
                            <div>
                                <h4>Categoria</h4><p>{cat}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2" md={{size: 2, offset: 2}}>
                            <h4>Estado</h4>
                            <p>{std}</p>
                        </Col>
                        <Col sm="2" md={{size: 2, offset: 2}}>
                            <div>
                                <h4>Cantidad de Interesados</h4>
                                <p>{cant}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 12, offset: 2}}>
                            <h4>Interesados</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8" md={{size: 8, offset: 2}}>
                        <Table hover>
                            <tbody>
                                {users}
                            </tbody>
                        </Table>
                        </Col>
                    </Row>
                    <Row >
                        <Col sm="4" md={{size: 4, offset: 2}}>
                            <Button color={"danger"}>Regresar</Button>
                        </Col>
                        <Col sm="4" md={{size: 4, offset: 2}}>
                        <Paginator page={3}/>
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default Desc;