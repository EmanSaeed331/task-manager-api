const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router  = new express.Router()


router.post('/tasks',auth,async (req,res)=>{
   // const task = new Task(req.body)
   console.log(req.body)
   const task = new Task({
    ...req.body,
    owner : req.user._id,

    });
    try{
     await task.save()

     res.status(201).send(task)
    }
    catch(e){
        res.status(500).send()
        console.log("error"+e)
    }
})
// GET /tasks/completed=false
// Pagination has two options : 1- limit , 2- skip .
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
 router.get('/tasks', auth ,async (req,res)=>{
    const match = {}
    const sort  = {} 
    if(req.query.completed){
        match.completed = req.query.completed ==='true'
    }
     if(req.query.sortBy){
         const parts = req.query.sortBy.split(':')
         sort[parts[0]] = parts[1] === 'desc' ?-1 :1

     }
   try{
   //const tasks = await Task.find({owner:req.user._id})
   await req.user.populate({
       path:'tasks',
       //match is an object and in here we can specify exactly which task we're trying to get.
       match , 
       Options:{
           limit : parseInt(req.query.limit),
           skip:parseInt(req.query.skip) ,
           sort
       }

   }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e){
        res.status(500).send("Error"+e)
    }
}) 

router.get('/task/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
      //const task = await Task.findById(_id)
      const task = await Task.findOne({_id, owner:req.user._id})
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

router.patch('/task/:id',auth ,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const task = await Task.findOne({_id:req.params.id , owner:req.user._id})
     //   const task = await Task.findById(req.params.id)

        //updating directly in DB
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body , {new:true ,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        res.send(task)

    }catch(e){
        res.status(404).send(e)
    }
})
//Deleting 

router.delete('/task/:id',auth,async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete({_id:req.params.id , owner:req.user._id})
        //const task = await Task.findByIdAndDelete(req.params.id)
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