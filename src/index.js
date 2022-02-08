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
/*  const main = async() =>{
  /*    const task = await Task.findById('62019ba0846a84cf12fccf77')
     await task.populate('owner').execPopulate()
     console.log(task.owner) 
      const user = await User.findById('62018386c58824de8d1c7b82')
      await user.populate('tasks').execPopulate(); 
      console.log(user.tasks)

      main() 
    }
 */