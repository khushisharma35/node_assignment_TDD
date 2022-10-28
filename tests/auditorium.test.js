const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
let token = '';
let userId = null;


beforeAll(async () => {
    const response = await request(app).post('/api/login').send({
      email:"test1234@gmail.com",
    passcode:"1234"});
    token = response._body.token;
    console.log("token:",response._body.token);
  });


describe('adding auditorium details',() =>{
    it('Return 201 status when the details are generated', () =>{
        return request(app)
        .post('/api/auditorium')
        .set('Authorization', 'Bearer ' + token)
        .send({
            auditoriumName : "inox",
             seats : 34
        })
        .expect(201)
    });
    it('Return status 400 when data is incorrect',() => {
        return request(app)
        .post('/api/auditorium')
        .set('Authorization', 'Bearer ' + token)
        .send({
            auditoriumName : 33,
             seats : "aa"
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0 ,
                message : "please enter the correct data"
            })
        });
    });
    

});

describe('Get  auditorium details',() => {
    it('Return 200 status on getting all auditorium data',() =>{
        return request(app)
        .get('/api/auditorium')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .then((response) => {
            expect(response.body.success).to.equal(1);
            expect(response.body.data).to.be.an('array') 
        });
    });
    it('Return 404 status when the auditorium does not exist',()=> {
        return request(app)
        .get('/api/auditorium/7')
        .set('Authorization', 'Bearer ' + token)
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : " auditorium not found"
            });
        });
    });
    

});

