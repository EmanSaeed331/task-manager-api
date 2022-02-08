const mongoose = require('mongoose')

const Task = new mongoose.model('Task',
  {  description:{
        type:String,
        trim:true,
        require:true,


    },
   completed:{
       type:Boolean,
       default:false
   },
   owner:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
   }

})
module.exports = Task