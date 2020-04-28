import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
        <td>{props.task.task_name}</td>
        <td>{props.task.task_description}</td>
        <td>{props.task.task_links}</td>
        <td>{props.task.task_priority}</td>
        <td>{props.task.task_due}</td>
        <td>{props.task.task_status}</td>
        <td>{props.task.task_comments}</td>
        <td>
            <Link to={"/edit/"+props.task._id}>Edit</Link>
        </td>
    </tr>
)


export default class ViewTask extends Component{
    constructor(props) {
        super(props);
        this.state = {tasks: []};
    }
    componentDidMount() {
        axios.get('http://localhost:5000/tasks/')
            .then(response => {
                this.setState({ tasks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    taskList() {
        return this.state.tasks.map(function(currentTask, i){
            return <Task task={currentTask} key={i} />;
        })
    }
render() {
    return(
        <div>
        <h3>Onboarding Tasks  </h3>
         <table className="table table-striped" style={{ marginTop: 20 }} > 
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Links</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Comments</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.taskList() }
            </tbody>
        </table> 
    </div>
    )
}
}