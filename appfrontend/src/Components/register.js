import React, {Component} from 'react';
import {register} from './userfunctions';
import { Form } from 'react-bootstrap';

export default class Register extends Component{
    constructor() {
        super()
        this.state = {
            fname:'',
            lname:'',
            email:'',
            password:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange (event) {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmit(event) {
        event.preventDefault()
        const user ={
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password
        }
        register(user).then (res =>{
                this.props.history.push('/login')
            })
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <Form noValidate onSubmit={this.onSubmit}>
                            <h1>Register</h1>
                            <Form.Group>
                                <label>First Name:</label>
                                <Form.Control  type="text" name="fname" placeholder="Enter First Name"  value ={this.state.fname} onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group>
                                <label>Last Name:</label>
                                <Form.Control  type="text" name= "lname" placeholder="Enter Last Name" value ={this.state.lname}   onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group>
                                <label>Email:</label>
                                <Form.Control  type="text" name= "email" placeholder="Enter Email"  value ={this.state.email} onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group>
                                <label>Password:</label>
                                <Form.Control  type="password" name="password"  placeholder="Enter Password" value ={this.state.password} onChange={this.onChange} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="submitForm.ControlSelect">
                                <input type="submit" value="Register" className="btn btn-primary" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}