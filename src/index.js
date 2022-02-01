 const express = require('express')
const User = require('./models/user')
 const app = express()
 const Task = require('./models/task')
 require('./db/mongoose')


 const port = process.env.PORT || 3000 
app.use(express.json());

app.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
     await user.save();
     res.status(201).send(user);
    }
    catch (e){
        res.status(400).send(e)
    }

})
app.get('/users',async(req,res)=>{
    try{
    const users = await User.find({})
        
        res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
        
   

})
app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
    const task = task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(500).send()

    }
    
})

app.get('/user/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const user =await User.findById(_id)
        if(!user){
            res.status(404).send()
        }
         res.status(201).send(user)
    
    }
    catch(e){
        res.status(500).send()
    }
   
   

})
app.get('/tasks', async (req,res)=>{
    try{
   const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch(e){
        res.status(500).send("Error"+e)
    }
})
app.get('/task/:id',async (req,res)=>{
    const _id = req.params.id
    try{
   const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)

    }
    catch(e){
        res.status(e).send(e)
    }
})

 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })