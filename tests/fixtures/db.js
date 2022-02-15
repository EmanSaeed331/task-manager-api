const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:'Emma',
    email:'emansaeed5330@gmail.com',
    password:'1100Emmma1100',
    tokens:[
        {
            token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
        }
    ]
}
const userTwoId = new mongoose.Types.ObjectId()

const userTwo= {
    _id:userTwoId,
    name:'EMMAA',
    email:'emansaeed133@gmail.com',
    password:'1100Emmma1100',
    tokens:[
        {
            token:jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
        }
    ]
}
const taskOne = {
    _id:new mongoose.Types.ObjectId(),
    description:'Test Task1',
    completed:true,
    owner:userOne._id,

}

const taskTwo= {
    _id:new mongoose.Types.ObjectId(),
    description:'Test Task2', 
    completed:true,
    owner:userOne._id,

}

const taskThree= {
    _id:new mongoose.Types.ObjectId(),
    description:'Test Task3', 
    completed:true,
    owner:userTwo._id,

}
const setUpDatabase = async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

}
module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne , 
    taskTwo,
    taskThree,
    setUpDatabase,

}