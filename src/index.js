 const express = require('express')
const User = require('./models/user')
 const app = express()
 const Task = require('./models/task')
 const userRouter = require('./routers/user')
 const taskRouter = require('./routers/task')
 require('./db/mongoose')


const port = process.env.PORT || 3000 
app.use(express.json());
app.use(userRouter )
app.use(taskRouter)

 app.listen(port,()=>{
     console.log('Server is up on port ' + port)
 })