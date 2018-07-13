import React from 'react';
import {ListGroup,ListGroupItem, Col, Row, Well, Panel} from 'react-bootstrap';

class About extends React.Component{
  render(){

    return(
      <Well>
        <Row>
          <Col xs ={18} md={12}>
            <Panel>
              <Panel.Body>
                <h3>About</h3>
                <p>Responsive bookstore application featuring the following technology:</p>
                <ListGroup>
                  <ListGroupItem>react</ListGroupItem>
                  <ListGroupItem>react-bootstrap</ListGroupItem>
                  <ListGroupItem>react-router</ListGroupItem>
                  <ListGroupItem>redux</ListGroupItem>
                  <ListGroupItem>express</ListGroupItem>
                  <ListGroupItem>node js</ListGroupItem>
                  <ListGroupItem>mongoose</ListGroupItem>
                  <ListGroupItem>axios</ListGroupItem>
                </ListGroup>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Well>)
    }
  }
  export default About;
