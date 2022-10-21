const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Adding shows details' ,() => {
    it('Return 201 when show details are generated',() => {
        return request(app)
        .post('/api/shows')
        .send({
          movieId : 2,
          auditoriumId : 1,
          screemTime: "1977-03-05 00:00:01",
          screen : 6
        })
        .expect(201)
    });
    it('Return status 400 when show data is incorrect',() => {
        return request(app)
        .post('/api/shows')
        .send({
          movieId : "khushi",
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
    it('Return 409 status if the show already exist ',() =>{
        return request(app)
        .post('/api/shows')
        .send({
          movieId : 2,
          auditoriumId : 1,
          screemTime: "1977-03-05 00:00:01",
          screen : 6
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "this show data already exists"
            });
        });
    });
});
describe('Get shows detail',() => {
    it('Return 200 status on getting shows data',()=> {
        return request(app)
        .get('/api/shows')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                      showId : 1 ,
                      movieId : 2,
                      auditoriumId : 1,
                      screemTime: "1977-03-05 00:00:01",
                      screen : 6
                    }
                ]
            });
        });
    });
    it('Return 404 status  when the show Id does not exist data',()=> {
        return request(app)
        .get('/api/shows/5')
        .expect(400)
        .then((response) => {
            expect({
                success : 1,
                message : "show Id not found"
            });
        });
    });
});

describe('Updating shows',() => {
    it('Return 200 status when the update is done successfully',() =>{
        return request(app)
        .patch('/api/shows/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
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
    ('return 404 status when the  show data is not correct' ,() => {
        return request (app)
        .patch('/api/shows/7')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        //.set('Cookie','token' + token)
        .send({
          showId : khushi,
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
    it('return 403 status when the request is forbidden as no auth token given' ,() => {
        return request (app)
        .patch('/api/shows/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
          showId : 1 ,
          movieId : 2,
          auditoriumId : 1,
          screemTime: "1977-03-05 00:00:01",
          screen : 6


        })
        .expect(403)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the show "
            });
        });
    });    
});
describe('Delete shows',() => {
    it('Return 200 status on deleting the shows iD provided',() => {
        return request(app)
        .delete('/api/shows/1')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "show was deleted was done successfully"
            });
        });
    });
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
