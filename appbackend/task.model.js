const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    task_name:{
        type:String
    },
    task_description:{
        type:String
    },
    task_links:{
        type:String
    },
    task_priority:{
        type: String
    },
    task_due:{
        type:Date
    },
    task_status:{
        type:String
    },
    task_comments:{
        type:String
    }
})

module.exports = mongoose.model('Task', Task);