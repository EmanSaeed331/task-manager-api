const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
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
   },
}, {
    timestamps:true,
}
)
const Task = new mongoose.model('Task',taskSchema)
module.exports = Task