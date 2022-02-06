const jwt = require('jsonwebtoken')


const auth = async (req,res,next) => {
    console.log('auth middleware')
    next()
}

/* app.use ((req , res , next)=>{
    if(req.method == 'GET'){
        res.send('GET requests are disabled')
    }
    else{
        next()
    }
}) */
/* app.use((req,res,next)=>{
  res.status(503).send('Site is currently down , Check back soon ')
}) */
module.exports = auth 