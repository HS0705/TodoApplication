import React, {Component} from 'react';
import { Form, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
export default class CreateTask extends Component{
    constructor(props){
        super(props);
        this.onChangeTaskName=this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription=this.onChangeTaskDescription.bind(this);
        this.onChangeTaskComments=this.onChangeTaskComments.bind(this);
        this.onChangeTaskLinks=this.onChangeTaskLinks.bind(this);
        this.onChangeTaskPriority=this.onChangeTaskPriority.bind(this);
        this.onChangeTaskStatus=this.onChangeTaskStatus.bind(this);
        this.onChangeTaskDue=this.onChangeTaskDue.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state ={
            task_name: '',
            task_description:'',
            task_links:'',
            task_priority:'',
            task_due: new Date() ,
            task_status:'',
            task_comments:''        
        }}
onChangeTaskName(event){
    this.setState({task_name: event.target.value});
}
onChangeTaskDescription(event){
    this.setState({task_description: event.target.value});
}
onChangeTaskComments(event){
    this.setState({task_comments: event.target.value});
}
onChangeTaskLinks(event){
    this.setState({task_links: event.target.value});
}
onChangeTaskPriority(event){
    this.setState({task_priority: event.target.value,
        color: this.onTextColor()});
}
onChangeTaskStatus(event){
    this.setState({task_status: event.target.value});
}
onChangeTaskDue(date){
    this.setState({task_due: date});
}

onSubmit(event) {
    event.preventDefault();
    const newTask= {
        task_name:this.state.task_name,
        task_description:this.state.task_description,
        task_links:this.state.task_links,
        task_priority:this.state.task_priority,
        task_due:this.state.task_due,
        task_status:this.state.task_status,
        task_comments:this.state.task_comments
    }
    axios.post('http://localhost:5000/tasks/add', newTask)
            .then(res => console.log(res.data));
    this.setState({
            task_name: '',
            task_description:'',
            task_comments:'',
            task_links:'',
            task_priority:'',
            task_status:'',
            task_due:'' }); 
}
    render(){
        return(
        <div style={{marginTop: 20}}>
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="nameForm.ControlSelect">
                    <label>Name:</label>
                    <FormControl  type="text" value={this.state.task_name} onChange={this.onChangeTaskName} />
                </Form.Group>
                <Form.Group controlId="descriptionForm.ControlSelect">
                    <label>Description:</label>
                    <FormControl  type="text"  value={this.state.task_description} onChange={this.onChangeTaskDescription} />
                </Form.Group>
                <Form.Group controlId="linksForm.ControlSelect">
                    <label>Links:</label>
                    <FormControl  as="textarea" rows="3"  value={this.state.task_links} onChange={this.onChangeTaskLinks} />
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
                    <DatePicker selected={this.state.task_due}
   onChange={this.onChangeTaskDue} value={this.state.task_due} />
                </Form.Group>
                <Form.Group controlId="statusForm.ControlSelect" id ="status">
                    <Form.Label>Status</Form.Label>              
                    <Form.Control type="text" value="Assigned" 
                        onChange={this.onChangeTaskStatus}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="commentsForm.ControlSelect">
                    <label>Comments:</label>
                    <Form.Control  as="textarea" rows="3"  value={this.state.task_comments} onChange={this.onChangeTaskComments} />
                </Form.Group>
                    <br />
                    <Form.Group controlId="submitForm.ControlSelect">
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </Form.Group>
            </Form>
        </div>)
    }
}