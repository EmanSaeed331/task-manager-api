require('../src/db/mongoose')
const User = require('../src/models/user')
User.findByIdAndUpdate('61f5dd2b29a99dd60866de55',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:25})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})