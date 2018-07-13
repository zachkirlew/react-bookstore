import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image,Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBook, deleteBook, getBooks, resetButton} from '../../actions/bookActions'
import axios from 'axios';
class BookForm extends React.Component{

  constructor(){
    super();
    this.state = {
      images: [{}],
      img:''
    }
  }

  componentDidMount(){
    this.props.getBooks();
    axios.get('/api/images')
      .then(response => this.setState({images: response.data}))
      .catch(err => this.setState({images: 'error loading images',img:''}))
  }

  handleSubmit(){
    const book = [{
      image: findDOMNode(this.refs.image).value,
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }]
    this.props.postBook(book);
    this.resetForm();
  }

  resetForm(){
    this.props.resetButton();
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({img:''});
  }

  handleSelect(img){
    this.setState({
      img: '/images/' + img
    })

  }

  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBook(bookId);
  }
  render(){
    const bookList = this.props.books.map(book =>
      <option key={book._id}>{book._id}</option>);

    const imgList = this.state.images.map((img, i) =>{
        return (
          <MenuItem key={i} eventKey={img.name}
          onClick={this.handleSelect.bind(this, img.name)}>{img.name}</MenuItem>)
        },this);

      return (
        <Well>
          <Row>
            <Col xs ={12} sm={6}>
              <Panel>
                <Panel.Body>
                  <InputGroup>
                    <FormControl type="text" ref="image" value={this.state.img} />
                    <DropdownButton
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title="Select an image"
                      bsStyle ="primary">
                        {imgList}
                      </DropdownButton>
                    </InputGroup>
                    <Image src={this.state.img} responsive/>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs ={12} sm={6}>
                <Panel>
                  <Panel.Body>
                    <FormGroup
                      controlId = 'title'
                      validationState={this.props.validation}>
                      <ControlLabel>Title</ControlLabel>
                      <FormControl
                        type = 'text'
                        placeholder = 'Enter title'
                        ref = 'title'>
                      </FormControl>
                      <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup
                      controlId = 'description'
                      validationState={this.props.validation}>
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        type = 'text'
                        placeholder = 'Enter description'
                        ref = 'description'>
                      </FormControl>
                      <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup
                      controlId = 'price'
                      validationState={this.props.validation}>
                      <ControlLabel>Price</ControlLabel>
                      <FormControl
                        type = 'text'
                        placeholder = 'Enter price'
                        ref = 'price'>

                      </FormControl>
                      <FormControl.Feedback/>
                    </FormGroup>
                    <Button
                      onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                      bsStyle={(!this.props.style)?('primary'):(this.props.style)}>
                      {(!this.props.msg)?('Save book') : (this.props.msg)}
                    </Button>
                  </Panel.Body>
                </Panel>
                <Panel style={{marginTop: '25px'}}>
                  <Panel.Body>
                    <FormGroup controlId = 'formControlSelect'>
                      <ControlLabel>Select a book id to delete</ControlLabel>
                      <FormControl
                        type = 'text'
                        placeholder = 'select'
                        ref = 'delete'
                        componentClass='select'>
                        <option value='select'>select</option>
                        {bookList}
                      </FormControl>
                      <FormControl.Feedback/>
                    </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle='danger'>Delete book</Button>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Well>
        )
      }
    }

    const mapStateToProps = state => {
      return {
        books: state.books.books,
        msg: state.books.msg,
        style:state.books.style,
        validation:state.books.validation
      }

    }

    const mapDispatchtoProps = (dispatch) =>{
      return bindActionCreators({
        postBook,
        deleteBook,
        getBooks,
        resetButton
      },dispatch)
    }

    export default connect(mapStateToProps,mapDispatchtoProps)(BookForm);
