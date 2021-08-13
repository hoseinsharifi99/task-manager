const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase} = require('./db')



beforeEach(setupDatabase)

test('should signup new user', async()=>{
    const response = await request(app).post('/users').send({
        name: 'dawshhosseingola',
        email: "mashtiii@gmail.com",
        password: "rodastetnist"
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

})

test('should login user',async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password:userOne.password
    }).expect(200)
})

test('should not login wrong user informatin',async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password:'snhdubuwebuowebfuowefb'
    }).expect(400)
})

test('Should get profile for user', async()=>{
    await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200)
})


test('Should not get profile for unauthentication user', async()=>{
    await request(app).get('/users/me').send().expect(401)
})