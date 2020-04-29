import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {  Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../logo.png';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
 class  NavigationBar extends Component {


  logOut(event) {
    event.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/')
  }
  render() {
    const signIn = (
      <Styles>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>  
                  <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item>
                </Nav>
              </Navbar.Collapse>
          </Styles>
    )
    
    const userProfile=(
      <Styles>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>  
                  <Nav.Item><Nav.Link href="/create">NewTask</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link href="/view">View Tasks</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link href="/profile">Profile</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link href="" onClick={this.logOut.bind(this)}>Logout</Nav.Link></Nav.Item>
                </Nav>
              </Navbar.Collapse>
          </Styles>
    )
    return (
      <Styles>
          <Navbar bg="dark" >
            <Navbar.Brand href="/">
              <img src={logo} width="30" height ="30" alt="pic" /> {'  '} 
              Digital Reminder
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">  
                <Nav.Item>{localStorage.usertoken ? userProfile : signIn}</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </Styles>
    )
  }}
  export default withRouter(NavigationBar);
