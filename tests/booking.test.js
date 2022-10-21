const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Adding booking details' ,() => {
    it('Return 201 when booking details are generated',() => {
        return request(app)
        .post('/api/shows')
        .send({
          paid : false,
          noOfSeats : 4,
          showId : 3,
          movieId :3
        })
        .expect(201)
    });
    it('Return status 400 when booking data is incorrect',() => {
        return request(app)
        .post('/api/booking')
        .send({
          paid : false,
          noOfSeats : "not found",
          showId :"zero",
          movieId :3
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0 ,
                message : "please enter the correct show data"
            })
        });
    });
    it('Return 409 status if the booking detail already exist ',() =>{
        return request(app)
        .post('/api/booking')
        .send({
          paid : false,
          noOfSeats : 4,
          showId : 3,
          movieId :3
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "this booking data already exists"
            });
        });
    });
});
describe('Get booking detail',() => {
    it('Return 200 status on getting booking data',()=> {
        return request(app)
        .get('/api/booking')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                      bookingId : 1,
                      paid : false,
                      noOfSeats : 4,
                      showId : 3,
                      movieId :3
                    }
                ]
            });
        });
    });
    it('Return 404 status  when the booking Id does not exist data',()=> {
        return request(app)
        .get('/api/booking/5')
        .expect(400)
        .then((response) => {
            expect({
                success : 0,
                message : "show Id not found"
            });
        });
    });
});

describe('Updating booking',() => {
    it('Return 200 status when the update is done successfully',() =>{
        return request(app)
        .patch('/api/booking/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
          paid : true,
          noOfSeats : 3,
          showId : 1,
          movieId : 2
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "update done successfully"
            });
        });
    });
    ('return 404 status when the  booking data is not correct' ,() => {
        return request (app)
        .patch('/api/booking/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        //.set('Cookie','token' + token)
        .send({
          paid : "no found",
          noOfSeats : 4,
          showId : 1,
          movieId :3

        })
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "failed to update the booking details"
            });
        });
        
    });
    it('return 403 status when the request is forbidden as no auth token given' ,() => {
        return request (app)
        .patch('/api/booking/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
          paid : false,
          noOfSeats : 4,
          showId : 3,
          movieId :3
        })
        .expect(403)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the booking "
            });
        });
    });    
});
describe('Delete booking',() => {
    it('Return 200 status on deleting the booking iD provided',() => {
        return request(app)
        .delete('/api/booking/1')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "booking was deleted was done successfully"
            });
        });
    });
    it('Return 404 status when booking id doesnot exist',() =>{
        return request(app)
        .delete('/api/booking/9')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "the booking Id does not exist"
            });
        });
    });
});
