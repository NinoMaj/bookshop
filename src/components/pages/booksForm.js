"use strict"
import React from 'react';
import {
  Well,
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  InputGroup,
  DropdownButton,
  Image,
  Row,
  Col,
  MenuItem
} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/booksActions';

class BooksForm extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [{}],
      img: ''
    };
  }

  componentDidMount() {
    this.props.getBooks();
    // Get images from API
    axios.get('/api/images')
      .then((response) => {
        this.setState({ images: response.data });
      })
      .catch((err) => {
        this.setState({ images: 'Error loading images files from the server', img:'' });
      });
  }

  handleSubmit() {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.postBooks(book);
  }

  onDelete() {
    const bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId);

  }

  handleImgSelect(img) {
    this.setState({
      img: `/images/${img}`
    });
  }

  resetForm() {
    this.props.resetButton();
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({
      img: ''
    });
  }

  render() {
    const booksList = this.props.books.map((booksArr) => {
      return (
        <option key={booksArr._id}> {booksArr._id}</option>
      );
    });

    const imgList = this.state.images.map((imgArr, i) =>
      <MenuItem
        key={i}
        eventKey={imgArr.name}
        onClick={this.handleImgSelect.bind(this, imgArr.name)}
        >
        {imgArr.name}
      </MenuItem>);

    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl
                  type="text"
                  ref="image"
                  value={this.state.img}
                  validationstate={this.props.validation}
                  />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                  />
                  <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="price" validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                onClick={!this.props.msg ? this.handleSubmit.bind(this) : this.resetForm.bind(this)}
                bsStyle={this.props.style ? this.props.style : "primary"}
                >
                {!this.props.msg  ? 'Save book' : this.props.msg}
              </Button>
            </Panel>
            <Panel style={{ marginTop: '25px' }}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={ this.onDelete.bind(this) } bsStyle="danger">Delete book</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

export default connect(
  mapStateToProps,
  { postBooks, deleteBooks, getBooks, resetButton }
)(BooksForm);
