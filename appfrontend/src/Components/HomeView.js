import React,{Component} from 'react';
import home from './home1.jpg';
export default class HomeView extends Component{
    
    render() {
        return(
        <div className="container-fluid mt-5">
            
            <h1 text-align="center">Welcome User</h1>
            <img src={home} alt="pic"></img>
        </div>
        
        )
    }
}