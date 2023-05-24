import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import UserForm from './userForm';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <br/>
        <h3> Welcome to <i> User Form Created By Navuluri Divya </i> </h3> <br/>
        <p className="btn btn-default"><Link to={'/user-form'}>Click here to fill form</Link> </p> &nbsp;
        <p className="btn btn-warning"><Link to={'/'}>Go to home</Link> </p>

        <Switch>
            <Route exact path='/user-form' component={UserForm} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
