 const express = require('express')
const User = require('./models/user')
 const app = express()
 const Task = require('./models/task')
 const userRouter = require('./routers/user')
 require('./db/mongoose')


const port = process.env.PORT || 3000 
app.use(express.json());
app.use(userRouter)


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
//Update 

app.patch('/task/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body , {new:true ,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(404).send(e)
    }
})
//Deleting 

app.delete('/task/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send
    }
})



 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })