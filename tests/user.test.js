const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');



describe('user registration',() => {
  it('Returns status 201 when signed in successfully', () =>{
    return request(app)
    .post('/api/users')
    .send({
      name : 'khushi',
      userType : 'admin',
      email :'khushi@gkmit.co',
      passcode : '1234'
    })
    .expect(200)
    
  });
  it('Return status 400 when the data is incorrect',() => {
    return request(app)
    .post('/api/users')
    .send({
      name : '00',
      userType : "admin",
      email : "test@gkmit.co",
      passcode : "$2b$10$bavB67DPmALmo"
    })
    .expect(400)
    .then((response) => {
      expect({
        message : "enter the correct parameters"
      })
      
    });
  });
});

describe('user login',() =>{
  it('Return status 200 if logged in successfully ',() =>{
    return request(app)
    .post('/api/users')
    .send({
      email : "khushi@gmail.com",
      passcode : "1234"
    })
    .expect(200)
    .then((response) => {
      expect({
        message : "login successfully done",
      })
    });
  });

  it('Return 400 for entering incorrect login details',() =>{
    return request(app)
    .post('/api/users')
    .send({
      email : "",
      passcode : "1234"
    })
    .expect(400)
    .then((response) => {
      expect({
        message: "please enter all details"
      });
    });
  });
  it('Return 401 for entering wrong credentials',()=> {
    return request(app)
    .post('/api/users')
    .send({
      email : "ram",
      passcode : "1234"
    })
    .expect(401)
    .then((response) => {
      expect({
        message : "invalid  credentials"
      });
    });
  });
});

describe('Get users',() => {
  it('Return 200 fo getting all users', ()=>{
    return request(app)
  .get('/api/users')
  .expect(200)
  .then((response) => {
    expect({
      "success" : 1,
      "data" : [
        {
        userId: 3,
            name: "test",
            userType: "admin",
            email: "test@gmail.com",
            passcode: "$2b$10$4wVB4yyhPH4kv/jZE/jkkeouHilbOBXNnAKX2SGC.fs1WC3YLkJGa"
      }
    ]
    });
  });
  });
  it('return 404 status when the user does not exist', () =>{
    return request(app)
    .get('.api/users//4')
    .expect(404)
    .then((response)=> {
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
    .patch('/api/users/1')
    .send({
      oldEmail: "harshit@gmail.com",
    email: "harshit2@gmail.com",
    name: "Harshit",
    passcode: "2524",
    userType: "customer"
    })
    .expect(200)
    .then((reponse) =>{
      expect({
        success: 1,
        message : " udate successfully done"
      });
    });
  });
  it('Return 404 status when the data is not correct',() => {
    return request(app)
    .patch('/api/users/1')
    .send({
      oldEmail: "harshit@gmail.com",
      email: "harshit2@gmail.com",
      name: "Harshit",
      passcode: "2524",
      userType: "customer"
    })
    .expect(404)
    .then((response) =>{
      expect({
        success : 0,
        message : " Failed to update the user data"
      });
    });
  });
});
describe('Delete users',() =>{
  it('Return 200 status if the user data is deleted successfully',() =>{
    return request(app)
    .delete('/api/users/2')
    .expect(200)
    .then((response) => {
      expect({
        success : 1 ,
        message : " User data was deleted successfully"
      });
    });

    });
  });
  it('return 404 status when user is not found',() =>{
    return request(app)
    .delete('/api/users/0')
    .expect(404)
    .then((response) => {
      expect({
        message : "user not found"
      });
    });
  });

