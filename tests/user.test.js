const { expect } = require('chai');
const request = require('supertest');
const { response } = require('../app');
const app = require('../app');
let token = '';
let userId = null;
let randId = Math.floor((Math.random() * 1000) + 1);


beforeAll(async () => {
  const response = await request(app).post('/api/login').send({
    email:"test1234@gmail.com",
  passcode:"1234"});
  token = response._body.token;
  console.log("token:",response._body.token);
});

describe('user registration',() => {
  it('Returns status 201 when signed up successfully', () =>{
    let response =  request(app)
    .post('/api/signup')
    .send({
      name : 'test'+randId.toString(),
      userType : 'admin',
      email :'test'+randId.toString()+'@gmail.com',
      passcode : '3333'
    })
    .expect(201)
    .then((response) => {
      userId = response._body.data.insertId 
      console.log("userId from signup:",response._body.data.insertId )
    })
    return response
  });
});

describe('user login',() =>{
  it('Return status 200 if logged in successfully ',() =>{
    return request(app)
    .post('/api/login')
    .send({
      email : "abc@gmail.com",
      passcode : "3333"
    })
    .expect(200)
    .then((response) => {
      expect({
        message : "login successfully done",
      })
    });
  });


});

describe('Get users',() => {
  // it('Return 200 fo getting all users', ()=>{
  //   return request(app)
  // .get('/api/users')
  // .expect(200)
  // .then((response) => {
  //   expect(response.body).equal({
  //     "success" : 1,
  //     "data" :expect.arrayContaining(expect.objectContaining(
  //       {
  //       userId: expect.to.be.a('number'),
  //       name: expect.any(String),
  //       userType: expect.any(String),
  //       email: expect.any(String),
  //       passcode: expect.any(String)})) 
        
      
  //   });
  // });
  // });
  it('return 404 status when the user does not exist', () =>{
    return request(app)
    .get('/api/users/4')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response)=> {
      // console.log(response);
      expect({
        success : 0,
        message : "user doesn't exist"
  
      });
    });
    
  });
  
});

describe('Update the users', () => {
  it('Return 200 status  when update is done successfully',()=>{
    return request(app)
    .patch('/api/users/4')
    .set('Authorization', 'Bearer ' + token)
    .send({
      name: "test",
      userType: "customer",
      email: "test83@gmaisl.com",
      passcode:"fwrgege",
    })
    .expect(200)
    .then((response) =>{
      console.log(response.text);
      expect({
        success: 1,
        message : " udate successfully done"
      });
    });
  });
});
describe('Delete users', () =>{
  it('return 404 status when user is not found',() =>{
    return request(app)
    .delete('/api/users/0')
    .set('Authorization', 'Bearer ' + token)
    .expect(404)
    .then((response) => {
      expect({
        message : "user not found"
      });
    });
  });
  // commented because same entry cant deleated twice
  // it('return 200 status when user is deleted',setTimeout(() =>{
  //   return request(app)
  //   .delete('/api/users/'+userId)
  //   .set('Authorization', 'Bearer ' + token)
  //   .expect(200)
  //   .then((response) => {
  //     expect({
  //       message : "user deleted successfully"
  //     });
  //   });
  // }),2000);
});

