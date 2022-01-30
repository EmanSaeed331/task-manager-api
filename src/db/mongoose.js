const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',{

})

const me = new User({
    name:'Eman',
    age:25,
    email:'EMANSAEED@gmail.com      ',
    password:'12882024853837'
});
me.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)

})

const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        require:true,


    },
    completed:Boolean,
    default:false,
    
})
const task = new Task({
    description:'Study Go lang',
    completed:true,

})
task.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})