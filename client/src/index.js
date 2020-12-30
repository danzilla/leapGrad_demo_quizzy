import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Auth from './Container/Auth';
import Dashboard from './Container/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Redirect from='*' to='/' />
      </Switch>
    </Router>
  </React.StrictMode>, document.getElementById('root'));
