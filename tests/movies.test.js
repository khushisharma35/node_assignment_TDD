const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Adding movie details' ,() => {
    it('Return 201 when movies details are generated',() => {
        return request(app)
        .post('/api/movies')
        .send({
            movieName:"Test Moovie",
            userId:3,
            movieTime: "2022-01-03 00:00:00"
        })
        .expect(201)
    });
    it('Return status 400 when movie data is incorrect',() => {
        return request(app)
        .post('/api/movies')
        .send({
            movieName:"Test Moovie",
            userId:3,
            movieTime: "22-11-11"
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0 ,
                message : "please enter the correct data"
            })
        });
    });
    it('Return 409 status if the moviedata already exist ',() =>{
        return request(app)
        .post('/api/movies')
        .send({
            movieName:"Test Moovie",
            userId:3,
            movieTime: "2022-01-03 00:00:00"
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "this movie data already exists"
            });
        });
    });
});
describe('Get movies detail',() => {
    it('Return 200 status on getting movies data',()=> {
        return request(app)
        .get('/api/movies')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                data : [
                    {
                        movieId: 1,
                        movieName: "Test Movie",
                        movieTime: "2021-12-31T18:30:00.000Z",
                        userId: 3
                    }
                ]
            });
        });
    });
    it('Return 404 status  when the movies Id does not exist data',()=> {
        return request(app)
        .get('/api/movies/7')
        .expect(400)
        .then((response) => {
            expect({
                success : 1,
                message : "movie Id not found"
            });
        });
    });
});

describe('Updating movie',() => {
    it('Return 200 status when the update is done successfully',() =>{
        return request(app)
        .patch('/api/movies/1')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
            movieName : "Test ",
            movieTime : "2021-11-31T18:30:00.010Z",
            userId : 4
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "update done successfully"
            });
        });
    });
    ('return 404 status when the  movie data is not correct' ,() => {
        return request (app)
        .patch('/api/movies/2')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        //.set('Cookie','token' + token)
        .send({
            movieName : 2,
            movieTime : "2021-11-31T18:30:00.010Z",
            userId : 0

        })
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the movie"
            });
        });
        
    });
    it('return 403 status when the request is forbidden as no auth token given' ,() => {
        return request (app)
        .patch('/api/movies/2')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
            movieName : 2,
            movieTime : "2021-11-31T18:30:00.010Z",
            userId : 0


        })
        .expect(403)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the movies "
            });
        });
    });    
});
describe('Delete movies',() => {
    it('Return 200 status on deleting the movie iD provided',() => {
        return request(app)
        .delete('/api/movies/2')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "movie was deleted successfully"
            });
        });
    });
    it('Return 404 status when movie id doesnot exist',() =>{
        return request(app)
        .delete('/api/movies/2')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "the movie Id does not exist"
            });
        });
    });
});
