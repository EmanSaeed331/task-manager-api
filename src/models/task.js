const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        require:true,


    },
    completed:Boolean,
    default:false,
    
})
module.exports = Task