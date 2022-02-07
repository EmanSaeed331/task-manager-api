const express = require('express')
const router  = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

// create a user 

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
     await user.save();
    const token =  await user.generateAuthToken()
     res.status(201).send({user , token });
    }
    catch (e){
        res.status(400).send(e)
    }
})
// get Authorized user --> user Profile 
router.get('/users/me',auth,async(req,res)=>{
   res.send(req.user)
})
//get all users
router.get('/users',auth,async(req,res)=>{
    try{
    const users = await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
})
// user logout 
router.post('/users/logout', auth ,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})
//get by id 
router.get('/user/:id', async (req,res)=>{
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
//Updating 
router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
    //This line changes directly in DB.  
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Deleting
router.delete('/user/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send()
    }

})
//login route 
router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        res.send({user , token })
    }catch(e){
        console.log('error'+e)
        res.status(400).send()
    }
    
})




module.exports =  router