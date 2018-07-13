import React from 'react';
import {findDOMNode} from 'react-dom';
import {postContact,resetButton} from '../../actions/contactActions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, Row, Well, Panel, Button, FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

class Contact extends React.Component{

  constructor(){
    super();
    this.state = {
      show: false
    }
  }

  handleSubmit(){
    const contact = [{
      name: findDOMNode(this.refs.name).value,
      email: findDOMNode(this.refs.email).value,
      message: findDOMNode(this.refs.message).value
    }]
    this.props.postContact(contact);
  }

  resetForm(){
    this.props.resetButton();
    findDOMNode(this.refs.name).value = '';
    findDOMNode(this.refs.email).value = '';
    findDOMNode(this.refs.message).value = '';
  }

  render(){
    return(
      <Well>
        <Row>
          <Col xs ={18} md={12}>
            <Panel>
              <Panel.Body>
                <h3>Contact</h3>
                <FormGroup controlId = 'Name'
                  validationState={this.props.validation}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type = 'text'
                    placeholder = 'Enter name'
                    ref = 'name'>
                  </FormControl>
                  <FormControl.Feedback/>
                </FormGroup>
                <FormGroup controlId = 'Email'
                  validationState={this.props.validation}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type = 'text'
                    placeholder = 'Enter email'
                    ref = 'email'>
                  </FormControl>
                  <FormControl.Feedback/>
                </FormGroup>
                <FormGroup controlId = 'Message'
                  validationState={this.props.validation}>
                  <ControlLabel>Message</ControlLabel>
                  <FormControl
                    type = 'text'
                    placeholder = 'Enter message'
                    ref = 'message'>
                  </FormControl>
                  <FormControl.Feedback/>
                </FormGroup>
                <Button
                  onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                  bsStyle={(!this.props.style)?('primary'):(this.props.style)}>
                  {(!this.props.msg)?('Submit message') : (this.props.msg)}
                </Button>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Well>)
    }
  }
  const mapStateToProps = state => {
    return {
      msg: state.contact.msg,
      style:state.contact.style,
      validation:state.contact.validation
    }

  }

  const mapDispatchtoProps = dispatch =>{
    return bindActionCreators({
      postContact,
      resetButton
    },dispatch)
  }

  export default connect(mapStateToProps,mapDispatchtoProps)(Contact);
