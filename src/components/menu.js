"use strict"
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  Navbar,
  Badge
} from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Book shop</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              componentClass={Link}
              eventKey={1}
              href="/about"
              to="/about"
            >
              About
            </NavItem>
            <NavItem
              componentClass={Link}
              eventKey={2}
              href="/contacts"
              to="/contacts"
            >
              Contact Us
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              componentClass={Link}
              eventKey={1}
              href="/admin"
              to="/admin"
              >
              Admin
            </NavItem>
            <NavItem
              componentClass={Link}
              eventKey={2}
              href="/cart"
              to="/cart"
              >
              Your Cart
              { this.props.cartItemsNumber > 0 ?
                <Badge className="badge">{this.props.cartItemsNumber}</Badge>
                :
                null
              }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
