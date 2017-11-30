"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import { getBooks } from '../../actions/booksActions';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BookList extends React.Component {
  componentDidMount() {
    this.props.getBooksProp();
  }
  render() {
    const booksList = this.props.books.map((booksArr) => {
      return (
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            images={booksArr.images}
            price={booksArr.price}
            />
        </Col>
      )
    });
    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={300} alt="library" src="/images/library.jpg" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="books" src="/images/books.jpg" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBooksProp: () => dispatch(getBooks()) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
