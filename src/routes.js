"user strict"

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './components/menu';
import Footer from './components/footer';

import BookList from './components/pages/bookList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const NotFound = function(){
    return (
      <div>
        <h3> Sorry, cannot find this page</h3>
      </div>
    )
}

const routes = (
  <Main>
    <Switch>
      <Route exact path="/" component={BookList} />
      <Route exact path="/admin" component={BooksForm} />
      <Route exact path="/cart" component={Cart} />
      <Route component={NotFound}/>
    </Switch>
  </Main>
);

export default routes;