const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',{

})
const User = mongoose.model('User',{
    name:{
        type:String,
        require:true
    },
    email:{
        type:String ,
        require: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive number')
            }

        }
    }
})
const me = new User({
    name:'Eman',
    age:25,
    email:'eman@gmail.com'
});
me.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)

})

const Task = mongoose.model('Task',{
    description:{
        type:String
    },
    completed:Boolean
})
const task = new Task({
    description:'Study Go lang',
    completed:true
})
task.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})