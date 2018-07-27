import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import AuthenticatedRoute from '../AuthenticatedRoute';
import Login from '../Login';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <AuthenticatedRoute path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
