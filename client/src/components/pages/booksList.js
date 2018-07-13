import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/bookActions';

import {Carousel, Grid, Col, Row} from 'react-bootstrap';

import BookItem from './bookItem';

class BookList extends React.Component{

  componentDidMount(){
    //dispatch get books action
    this.props.getBooks();
  }

  render(){
    const booksList = this.props.books.map((book) => {
      return(
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem
            _id = {book._id}
            title = {book.title}
            description = {book.description}
            image = {book.image}
            price = {book.price}
          />
        </Col>
      )
    })
    return (
      <Grid >
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={'100%'} height={600} alt="900x600" src="/images/home1.jpeg" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={'100%'} height={600} alt="900x600" src="/images/home2.jpeg" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row style={{marginTop:'15px'}}>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    books: state.books.books
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    getBooks: getBooks
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(BookList);
