 const express = require('express')
const User = require('./models/user')
 const app = express()
 const Task = require('./models/task')
 require('./db/mongoose')


 const port = process.env.PORT || 3000 
app.use(express.json());
app.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then((result) => {
        console.log(result);
        res.send(user)
        
    }).catch((err) => {
        console.log(err)
    });


})
app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then((task)=>{
        res.send(task)


    }).catch((error)=>{
        res.send(error)

    })
})
app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        
        res.send(users)
        
        
    }).catch((error)=>{
        res.status(500).send()


    })

})
app.get('/user/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send()
    })
   

})
app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.send(error)
    })
})
app.get('/task/:id',(req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            res.status(404).send()
        }
        res.send(task)

    }).catch((error)=>{
        res.status(500).send()
    })
})

 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })