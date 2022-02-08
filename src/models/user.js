const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require ('../models/task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String ,
        unique:true,
        require: true,
        trim:true,
        lowerCase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive number')
            }

        }
    },
    password:{
        type:String , 
        require : true , 
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens:[{
        token:{
            type:String, 
            required:true,
        }
    }] },
    {timestamps:true
    },
)
// make a relation between task and user .
// virtual is for mongoose to figure out how user and task are related . 
// it is not stored in DB . 
userSchema.virtual('tasks', {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'

})
//methods are accessible for instance methods.
userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token =jwt.sign({_id:user._id.toString() },'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
//statics are accessible for model methods 
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error ('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error ('Unable to Login')
    }
    return user 
}
userSchema.methods.toJSON = function (){
    const user = this  
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject

}
// Hash the plainText password before saving 
userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
//Delete user tasks when user is removed . 
userSchema.pre('remove',async function (next) {
    const user = this
    Task.deleteMany({owner:user._id})

    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User