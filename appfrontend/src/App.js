import React,{Component}from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import ViewTask from './Components/ViewTask';
import EditTask from './Components/edittask';
import CreateTask from './Components/createtask';
import HomeView from './Components/HomeView';
import Login from './Components/login';
import Register from './Components/register';
import Profile from './Components/profile';
import NavigationBar from './Components/navigationbar';
import logo from './logo.png';
import './App.css';

export default class App extends Component {
  render(){
  return (
    <Router>
        <div className="container">
          <NavigationBar />
          <Route path = "/" exact component={HomeView} />
          <Route path ="/edit/:id" component={EditTask} />
          <Route path="/view" component={ViewTask} />
          <Route path="/create" component={CreateTask} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
        </div>
    </Router>
  );
}
}

