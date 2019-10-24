import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, Form, Label, Row} from "reactstrap";
import {BOOKMARK} from "../../Constants/routes";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import Paginator from "../Paginator";

function IdeaList(props) {
    const{catsOp, onChange, ideasDesc, error, fetchIdeas} = props;
    return (
              <React.Fragment>
                  <Row className={"mt-5  justify-content-center"}>
                      <Col sm={{size: 6, offset:3}}>
                          <Form>
                              <FormGroup row>
                                  <Label for="cat" sm={3} >Categorias</Label>
                                  <Col sm={{ size: 3}}>
                                      <Input  type={'select'} id="category"  name = "category" onChange={onChange} defaultValue={0}>
                                          {catsOp}
                                      </Input>
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Label for="cat"   sm={3}>Ideas por Pagina</Label>
                                  <Col sm={{ size: 3}}>
                                      <Input  type={'select'} id="rows"  name = "rows"  onChange={onChange} defaultValue={3}>
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
                      (error)? <Row className={"mt-4 justify-content-center"}>
                              <Col sm={{ size: 2}} >
                                  {error}
                              </Col>
                          </Row>     :
                          <div>{ideasDesc}</div>

                  }
                  <Row className={"mt-4 justify-content-center"}>
                      <Col sm={{ size: 1}} >
                          <div className={"justify-content-center "}>
                              <Button  color={'primary'} onClick={(e) => {
                                  e.preventDefault();
                                  fetchIdeas(1, true)}}>Buscar</Button>
                          </div>
                      </Col>
                  </Row>
                  {/*{(showPaginator)?*/}
                  {/*    <Row className={"justify-content-md-center mt-5"}>*/}
                  {/*        <Paginator initPage={initPage} perTag = {perTag} currentPage = {currentPage} max ={maxpage} onArrowMove={this.onArrowMove}*/}
                  {/*                   onPageMove = {this.onPageMove}/>*/}
                  {/*    </Row>:null*/}
                  {/*}*/}
              </React.Fragment>
    );
}

export default IdeaList;