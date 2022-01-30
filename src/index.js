 const express = require('express')
 const app = express()
 const port = process.env.PORT || 3000 
app.use(express.json());
app.post('/user',(req,res)=>{
    console.log(req.body)

    res.send('testing user')

})

 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })