const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req,res,next) => {

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        //check the token is verified 
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id , 'tokens.token':token})
        // validate user existence .
        if (!user){
            throw new Error ()
        }
        req.token = token 
        /* give to route handler access to the user that fetched from DB ,
           we already fetch them and there's no need for the root handlers to fetch them again . 

        */
       req.user = user 

        next()

    }
    catch(e){
        res.status(401).send({error :'Please authenticate. '})
        console.log("error"+ e)
    }    
}

//Disable all get requests 
/* app.use ((req , res , next)=>{
    if(req.method == 'GET'){
        res.send('GET requests are disabled')
    }
    else{
        next()
    }
}) */
// shut down website 
/* app.use((req,res,next)=>{
  res.status(503).send('Site is currently down , Check back soon ')
}) */
module.exports = auth 