import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';

export default class Profile extends Component{
    constructor(){
        super()
        this.state ={
            fname:'',
            lname:'',
            email:'',
        }
    }
    componentDidMount() {
        const token =localStorage.usertoken;
        const decoded = jwt_decode(token)
        this.setState({
            fname:decoded.fname,
            lname:decoded.lname,
            email:decoded.email
        })
    }
render() {
    return(
        <div className="container-fluid">
                < div className="col-sm-8 mx-auto">
                    <h1 align="center">Profile</h1>
                </div>
                <div>
                 <span><p>Hello{this.state.fname} </p></span>
      
                 <h3>Account Information</h3>
                 <div className="container-fluid">
                     <div>
                         <label>First name : </label>
                         {this.state.fname}
                     </div>
                     <div>
                         <label>Last name : </label>
                         {this.state.lname}
                     </div>
                     <div>
                         <label>Email : </label>
                         {this.state.email}
                     </div>
                 </div>
            </div>
        </div>
    )
}
}