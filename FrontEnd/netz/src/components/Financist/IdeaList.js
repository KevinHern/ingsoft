import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Form, Label, Row} from "reactstrap";
import {BOOKMARK} from "../../Constants/routes";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import Paginator from "../Paginator";
import Spinners from "../Wait";
import PropTypes from "prop-types";
import Idea from './Idea';


/**
 * Functional component to list Ideas
 * @param props
 * @returns {*}
 * @constructor
 */
function IdeaList(props) {
    const{catsOp, onChange, ideasDesc, error, fetchIdeas, category, rows, wait} = props;
    console.log(ideasDesc);
    return (
              <React.Fragment>
                  <Row className={"mt-5  justify-content-center"}>
                      <Col sm={{size: 6, offset:3}}>
                          <Form>
                              <FormGroup row>
                                  <Label for="cat" sm={3} >Categorias</Label>
                                  <Col sm={{ size: 3}}>
                                      <Input  type={'select'} id="category"  name = "category" onChange={onChange} defaultValue={category}>
                                          {catsOp}
                                      </Input>
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="cat"   sm={3}>Ideas por Pagina</Label>
                                  <Col sm={{ size: 3}}>
                                      <Input  type={'select'} id="rows"  name = "rows"  onChange={onChange} defaultValue={rows}>
                                          <option value={1} >1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                      </Input>
                                  </Col>
                              </FormGroup>
                          </Form>
                      </Col>
                  </Row>


                  {
                      (wait) ?
                          <Spinners/>
                          :
                          <React.Fragment>
                              {
                                  (error)?
                                      <Row className={"mt-4 justify-content-center"}>
                                          <Col sm={{ size: 2}} >
                                              {error}
                                          </Col>
                                      </Row>
                                      :
                                      <React.Fragment>
                                          {ideasDesc}
                                      </React.Fragment>
                              }
                          </React.Fragment>
                  }
                  <Row className={"mt-4 justify-content-center"}>
                      <Col sm={{ size: 1}} >
                          <div className={"justify-content-center "}>
                              <Button  color={'primary'} onClick={() =>
                                  fetchIdeas(1, true)}>Buscar</Button>
                          </div>
                      </Col>
                  </Row>
              </React.Fragment>
    );
}

IdeaList.propTypes = {
    catsOp: PropTypes.arrayOf(PropTypes.node),
    onChange: PropTypes.func,
    // ideasDesc: PropTypes.oneOfType([
    //         PropTypes.instanceOf(Spinners),
    //         // PropTypes.arrayOf(PropTypes.objectOf(PropTypes.instanceOf(Idea))),
    // ]),
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fetchIdeas: PropTypes.func,
    category: PropTypes.number,
    rows: PropTypes.number,
    wait: PropTypes.bool
};
export default IdeaList;