 const express = require('express')
const User = require('./models/user')
 const app = express()
 require('./db/mongoose')

 const port = process.env.PORT || 3000 
app.use(express.json());
app.post('/user',(req,res)=>{
    const user = new User(req.body)
    user.save().then((result) => {
        console.log(result);
        res.send(user)
        
    }).catch((err) => {
        console.log(err)
    });


})

 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })