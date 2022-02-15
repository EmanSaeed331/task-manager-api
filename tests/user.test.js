const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name:'Emma',
    email:'emansaeed133@gmail.com',
    password:'1100Emmma1100'
}
beforeEach(async ()=>{
     await User.deleteMany()
     await new User(userOne).save() 
})
//testing create user 
test('Sign Up a new User',async ()=>{
    await request(app).post('/users').send({
        name:'Eman',
        email:'EmanSaeed5330@gmail.com',
        password:'Eman@0101010!!',

    }).expect(201)
})
//testing login 
test('Should login existing user', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password,
    }).expect(200)
})

// test login failure 
test('Should not login not existing user', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'testPass010101010',
    }).expect(400)
})