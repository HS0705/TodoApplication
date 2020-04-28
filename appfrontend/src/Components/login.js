import React, {Component} from 'react';
import {login} from './userfunctions';
import { Form } from 'react-bootstrap';

export default class Login extends Component{
    constructor(){
        super()
        this.state = {
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

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then (res =>{
            if (res){
                this.props.history.push('/profile')
            }
        })
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <Form noValidate onSubmit={this.onSubmit}>
                            <h1>Sign In</h1>
                            <Form.Group>
                                <label>Email:</label>
                                <Form.Control  type="text" name="email" value ={this.state.email} placeholder="Enter Email" onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group>
                                <label>Password:</label>
                                <Form.Control  type="password" name="password" value ={this.state.password} placeholder="Enter Password"  onChange={this.onChange} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="submitForm.ControlSelect">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}