const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',{

})
const User = mongoose.model('User',{
    name:{
        type:String
    },
    age:{
        type:Number
    }
})
const me = new User({
    name:'Eman',
    age:24
});
me.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)

})