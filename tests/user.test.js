const request = require('supertest')
const app = require('../src/app')

test('Sign Up a new User',async ()=>{
    await request(app).post('/users').send({
        name:'Eman',
        email:'EmanSaeed5330@gmail.com',
        password:'Eman@0101010!!',

    }).expect(201)
})