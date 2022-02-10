const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{

})
/*     const me = new User({
        name:'Eman',
        age:25,
        email:'EMANSAEED@gmail.com',
        password:'12882024853837'
    });
    me.save().then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)

    })
 */

/* const task = new Task({
    description:'Study Go lang',
    completed:true,

})
task.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})*/