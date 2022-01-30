require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
User.findByIdAndUpdate('61f5dd2b29a99dd60866de55',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:25})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

Task.findByIdAndUpdate('61f5df183bb9caec917d4f3f',{completed:false}).then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})