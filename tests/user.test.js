const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId , userOne,setUpDatabase } = require('./fixtures/db')

beforeEach(setUpDatabase)
/*
 ########### 1-HTTP Response status code test ###########
*/
/*
 ########### 2- HTTP Response body  test ###########
*/
//testing create user 
test('Sign Up a new User',async ()=>{
    const response = await request(app).post('/users').send({
        name:'Eman',
        email:'EmanSaeed5330@gmail.com',
        password:'Eman@0101010!!',

    }).expect(201)
    // assert that the database was changed correctly //
    const user = await  User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    // Assertions about the response 
    expect(response.body).toMatchObject({
        user:{
            name:'Eman',
            email:'EmanSaeed5330@gmail.com',
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('Eman@0101010!!')
})
//testing login 
test('Should login existing user', async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password,
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

// test login failure 
test('Should not login not existing user', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'testPass010101010',
    }).expect(400)
})
// test user fetching profile 
// confirm if the server confirm that token --> it is not expired  
test('Should get profile for user ', async() =>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('Should not get profile for unauthenticated user', async()=>
{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

//test delete account 
test('Should delete account for user', async() =>{
    await request(app)
    .delete('/user/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200) 
    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})
test('Should not delete account unauthenticated user', async() =>{
    await request(app)
    .delete('/user/me')
    .send()
    .expect(401)

})
test('Should upload avatar image', async() =>{
    await request(app)
      .post('/users/me/avatar')
      .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
      .attach('avatar','tests/fixtures/test.jpg')
      .expect(200)
      const user = await User.findById(userOneId)
      expect(user.avatar).toEqual(expect.any(Buffer))
  })

test('Should update valid user fields', async() => {
    await request(app)
    .patch('/user/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Peta'
    })
    .expect(200)
    
})

test('Should not update invalid user fields', async() => {
    await request(app)
    .patch('/user/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Cairo'
    })
    .expect(400)

 
    
})