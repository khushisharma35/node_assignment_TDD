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

describe('Adding booking details' ,() => {
    it('Return 201 when booking details are generated',() => {
        return request(app)
        .post('/api/booking')
        .set('Authorization', 'Bearer ' + token)
        .send({
          paid : false,
          noOfSeats : 4,
          showId : 3,
          movieId :3
        })
        .expect(201)
    });
    
});
describe('Get booking detail',() => {
    it('Return 200 status on getting booking data',()=> {
        return request(app)
        .get('/api/booking')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .then((response) => {
         expect(response.body.success).to.equal(1);
          expect(response.body.data).to.be.an('array')
            
       })
        });
    });
    



