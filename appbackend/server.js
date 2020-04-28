const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose= require('mongoose');
const app =express();
const taskRoutes = express.Router();
const users=express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
let Task = require('./task.model');
let User = require('./user.model');

const port= 5000

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasks',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Mongodb database started!");
})

taskRoutes.route('/').get(function(req, res) {
    Task.find(function(error, tasks) {
        if (error) {
            console.log(error);
        } else {
            res.json(tasks);
        }
    });
});
taskRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(error, Task) {
        res.json(Task);
    });
});
taskRoutes.route('/update/:id').post(function(req, res) {
    Task.findById(req.params.id, function(error, task) {
        if (!task)
            res.status(404).send("data is not found");
        else
            task.task_name = req.body.task_name;    
            task.task_description = req.body.task_description;
            task.task_links = req.body.task_links;
            task.task_priority = req.body.task_priority;
            task.task_due = req.body.task_due;
            task.task_status = req.body.task_status;
            task.task_comments=req.body.task_comments;
            task.save().then(Task => {
                res.json('Task updated!');
            })
            .catch(error => {
                res.status(400).send("Update not possible");
            });
    });
});
taskRoutes.route('/add').post(function(req, res) {
    let newtask = new Task(req.body);
    newtask.save()
        .then(newtask => {
            res.status(200).json({'Task': 'Task added successfully'});
        })
        .catch(error => {
            res.status(400).send('adding new task failed');
        });
});
users.use(cors())
 SECRET_KEY=process.env.SECRET_KEY

users.post('/register', (req,res)=>{
    const userData={
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password
    }
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user =>{
                    res.json({status:user.email + 'registered'})
                })
                .catch(err =>{
                    res.send("error:"+err)
                })
            })
        }else{
            res.json({error:'User already exists'})
        }
    })
    .catch(err =>{
        res.send('error:'+ err)
    })
})

users.post('/login', (req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload ={
                    _id:user.id,
                    fname:user.fname,
                    lname:user.lname,
                    email:user.email,
                }
                let token = jwt.sign(payload, SECRET_KEY, {
                    expiresIn:1440
                })
                res.send(token)
            }else{
                res.json({error:"User does not exist"})
            }
        }else{
            res.json({error: "User does not exist"})
        }
    })
    .catch(err => {
        res.send('error:'+ err)
    })
})
users.get('/profile', (res,req) =>{
    let decoded= jwt.verify(req.headers['authorization'], SECRET_KEY)
    User.findOne({
        _id:decoded._id
    })
    .then(user =>{
        if (user) {
            res.json(user)
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err =>{
        res.send('error' + err)
    })

})
app.use('/tasks', taskRoutes);
app.use('/users',users);
app.listen(port, () =>{
    console.log("Server is running on Port: " + port);
});




