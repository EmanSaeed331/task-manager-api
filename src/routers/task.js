const express = require('express')
const router  = new express.Router()
const Task = require('../models/task')



router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
     await task.save()
     res.status(201).send(task)
    }
    catch(e){
        res.status(500).send()

    }
    
})
router.get('/tasks', async (req,res)=>{
    try{
   const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch(e){
        res.status(500).send("Error"+e)
    }
})

router.get('/task/:id',async (req,res)=>{
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

router.patch('/task/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        //updating directly in DB
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body , {new:true ,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(404).send(e)
    }
})
//Deleting 

router.delete('/task/:id',async(req,res)=>{
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






module.exports = router  