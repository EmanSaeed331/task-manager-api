const express = require('express')
const router  = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmails , sendCancelationEmail} = require('../emails/account')

// create a user 

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
     await user.save();
     sendWelcomeEmails(user.email,user.name)
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
// logout of all sessions 
router.post('/users/logoutAll', auth , async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})
//get by id 
/* router.get('/user/:id', async (req,res)=>{
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
   
   

}) */
//Updating 
router.patch('/user/me',auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const user = await User.findById(req.params.id)
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
    //This line changes directly in DB.  
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    // we don't need to check if user is exists as he is actually logged in . 
      /*   if (!req.user) {
            return res.status(404).send()
        }
      */
    res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Deleting
router.delete('/user/me',auth,async(req,res)=>{
    try{
   /*      const user = await User.findByIdAndDelete(req.user._id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user) */
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name);
        res.send(req.user)


    }
    catch(e){
        res.status(500).send()
    }

})
//login route 
router.post('/users/login/avatar',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token })
    }catch(e){
        console.log('error'+e)
        res.status(400).send()
    }
    
})
//Avatar upload 
// set multer configuration 
const upload = multer({
   // dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg)$/)){
            return cb(new Error ('Please upload a jpg | jpeg images'))
        }
        cb(undefined , true)
    }
})
//Upload end point 
router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
  const buffer = await sharp(req.file.buffer).resize({width:250 , height:250 }).png().toBuffer()
  req.user.avatar =  buffer
   await req.user.save()
   res.send()
},(error,req,res,next) =>{
    res.status(400).send({error:error.message})
})
//Delete avatar 

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar =  undefined
    await req.user.save()
    res.send()
})
//Get avatar 
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})



module.exports =  router