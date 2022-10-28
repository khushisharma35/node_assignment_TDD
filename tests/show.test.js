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


describe('Adding shows details' ,() => {
    it('Return 201 when show details are generated',() => {
        return request(app)
        .post('/api/show')
        .set('Authorization', 'Bearer ' + token)
        .send({
          movieId : 2,
          auditoriumId : 1,
          screemTime: "1977-03-07 00:00:01",
          screen : 6
        })
        .expect(201)
    });
    it('Return status 400 when show data is incorrect',() => {
        return request(app)
        .post('/api/show')
        .set('Authorization', 'Bearer ' + token)
        .send({
          movieId : 56,
          auditoriumId : 1,
          screemTime: "1977-03-05 00:00:01",
          screen : 6
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
describe('Get shows detail',() => {
    it('Return 200 status on getting shows data',()=> {
        return request(app)
        .get('/api/show')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .then(response => {
            expect(response.body.success).to.equal(1);
            expect(response.body.data).to.be.an('array')
            
        })
        
        
    });
    
});

describe('Updating shows',() => {
    it('Return 200 status when the update is done successfully',() =>{
        return request(app)
        .patch('/api/show/1')
        .set('Authorization', 'Bearer ' + token)
        
        .send({
          movieId : 1,
          auditoriumId : 2,
          screemTime: "1974-03-05 00:00:01",
          screen : 2
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "update done successfully"
            });
        });
    });
    it('return 404 status when the  show data is not correct' ,() => {
        return request (app)
        .patch('/api/shows/7')
        .set('Authorization', 'Bearer ' + token)
        
        //.set('Cookie','token' + token)
        .send({
          showId : 7,
          movieId : 8,
          auditoriumId : 1,
          screemTime: "1977-03-05 00:00:01",
          screen : 6

        })
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "failed to update the show details"
            });
        });
        
    });
    // it('return 403 status when the request is forbidden as no auth token given' ,() => {
    //     return request (app)
    //     .patch('/api/shows/1')
    //     .send({
    //       showId : 1 ,
    //       movieId : 2,
    //       auditoriumId :w 1,
    //       screemTime: "1977-03-05 00:00:01",
    //       screen : 6


    //     })
    //     .expect(403)
    //     .then((response) => {
    //         expect({
    //             success : 0,
    //             message : "failedto update the show "
    //         });
    //     });
    // });    
});
describe('Delete shows',() => {
   
    it('Return 404 status when show id doesnot exist',() =>{
        return request(app)
        .delete('/api/shows/9')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "the show Id does not exist"
            });
        });
    });

});
