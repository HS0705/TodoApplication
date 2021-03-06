import React, {Component} from 'react';
import {Form, FormControl} from 'react-bootstrap';
import axios from 'axios';

export default class EditTask extends Component{
    constructor(props) {
        super(props);
        this.onChangeTaskName=this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription=this.onChangeTaskDescription.bind(this);
        this.onChangeTaskComments=this.onChangeTaskComments.bind(this);
        this.onChangeTaskLinks=this.onChangeTaskLinks.bind(this);
        this.onChangeTaskPriority=this.onChangeTaskPriority.bind(this);
        this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
        this.onChangeTaskDue=this.onChangeTaskDue.bind(this);
        this.onChangeTaskComments = this.onChangeTaskComments.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            task_name: '',
            task_description:'',
            task_links:'',
            task_priority:'',
            task_due:'' ,
            task_status: '',
            task_comments: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    task_name:response.data.task_name,
                    task_description:response.data.task_description,
                    task_links:response.data.task_links,
                    task_priority:response.data.task_priority,
                    task_status: response.data.task_status,
                    task_due:response.data.task_due,
                    task_comments: response.data.task_comments
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeTaskName(event){
        this.setState({task_name: event.target.value});
    }
    onChangeTaskDescription(event){
        this.setState({task_description: event.target.value});
    }
    onChangeTaskLinks(event){
        this.setState({task_links: event.target.value});
    }
    onChangeTaskPriority(event){
        this.setState({task_priority: event.target.value});
    }
    onChangeTaskDue(event){
        this.setState({task_due: event.target.value});
    }
    onChangeTaskStatus(event) {
        this.setState({task_status: event.target.value});
    }
    onChangeTaskComments(event) {
        this.setState({task_comments: event.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
        const obj = {
            task_name:this.state.task_name,
            task_description:this.state.task_description,
            task_links:this.state.task_links,
            task_priority:this.state.task_priority,
            task_due:this.state.task_due,
            task_status: this.state.task_status,
            task_comments:this.state.task_comments
        };
        console.log(obj);
        axios.post('http://localhost:5000/tasks/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }
    render(){
        return(
        <div>
            <h3 align="center">Update Task Status and Comments</h3>
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="nameForm.ControlSelect">
                    <label>Name:</label>
                    <FormControl readOnly type="text" value={this.state.task_name} onChange={this.onChangeTaskName} />
                </Form.Group>
                <Form.Group controlId="descriptionForm.ControlSelect">
                    <label>Description:</label>
                    <FormControl readOnly type="text"  value={this.state.task_description} onChange={this.onChangeTaskDescription} />
                </Form.Group>
                <Form.Group controlId="linksForm.ControlSelect">
                    <label>Links:</label>
                    <FormControl readOnly as="textarea" rows="3"  value={this.state.task_links} onChange={this.onChangeTaskLinks} />
                </Form.Group>
                <Form.Group controlId="priorityForm.ControlSelect">
                    <Form.Label>Priority</Form.Label>              
                    <Form.Control as="select" 
                        onChange={this.onChangeTaskPriority}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="dueDateForm.ControlSelect">
                    <label>Due Date:</label>
                    <Form.Control type="text" readOnly dateFormat="YYYY-MM-DD" value={this.state.task_due} />
                </Form.Group>
                <Form.Group controlId="statusForm.ControlSelect">
                    <Form.Label>Status</Form.Label>              
                    <Form.Control as="select" value={this.state.task_status} 
                        onChange={this.onChangeTaskStatus}>
                        <option>Select</option>
                        <option value="Started">Started</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Completed">Completed</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="commentsForm.ControlSelect">
                    <label>Comments:</label>
                    <Form.Control  as="textarea" rows="3"  value={this.state.task_comments} onChange={this.onChangeTaskComments} />
                </Form.Group>
                    <br />
                    <Form.Group controlId="submitForm.ControlSelect">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </Form.Group>
            </Form>
        </div>)
    }
}