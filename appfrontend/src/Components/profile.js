import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';

export default class Profile extends Component{
    constructor(){
        super()
        this.state ={
            fname:'',
            lname:'',
            email:'',
            password:''
        }
    }
    componentDidMount() {
        const token =localStorage.user(token);
        const decoded = jwt_decode(token)
        this.setState({
            fname:decoded.fname,
            lname:decoded.lname,
            email:decoded.email
        })
    }
render() {
    return(
        <div className="container">
            <div className="jumbotron mt-5">
                < div className="col-sm-8 mx-auto">
                    <h1 align="center">Profile</h1>
                </div>
                <div>
                {this.state.lname},{this.state.fname}
                </div>
                <div>
                    {this.state.email}
                </div>
            </div>
        </div>
    )
}
}