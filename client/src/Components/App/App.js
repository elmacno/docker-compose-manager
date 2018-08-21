import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../Services/Store';
import { AuthenticatedRoute } from '../../Helpers';
import Login from '../Login';
import Home from '../Home';
import Profile from '../Profile';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/" component={Home} />
            <AuthenticatedRoute exact path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
