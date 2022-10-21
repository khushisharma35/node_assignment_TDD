const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('adding auditorium details',() =>{
    it('Return 201 status when the details are generated', () =>{
        return request(app)
        .post('/api/auditorium')
        .send({
            auditoriumName : "maam",
             seats : 9
        })
        .expect(201)
    });
    it('Return status 400 when data is incorrect',() => {
        return request(app)
        .post('/api/auditorium')
        .send({
            auditoriumName : "0",
             seats : 9
        })
        .expect(400)
        .then((response) => {
            expect({
                success : 0 ,
                message : "please enter the correct data"
            })
        });
    });
    it('Return 409 status if the data already exist ',() =>{
        return request(app)
        .post('/api/auditorium')
        .send({
            auditoriumName : "0",
             seats : 9
        })
        .expect(409)
        .then((response) => {
            expect({
                success : 0,
                message : "this auditorium data already exists"
            });
        });
    });

});

describe('Get  auditorium details',() => {
    it('Return 200 status on getting all auditorium data',() =>{
        return request(app)
        .get('/api/auditorium')
        .expect(200)
        .then((response) => {
            expect({
                success : 1 ,
                data : [
                    {
                        
                            auditoriumId: 1,
                            auditoriumName: "pvr",
                            seats: 2
                        },
                        {
                            auditoriumId: 2,
                            auditoriumName: "inox",
                            seats: 5
                        }
                    
                ]
            });
        });
    });
    it('Return 404 status when the auditorium does not exist',()=> {
        return request(app)
        .get('/api/auditorium/7')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : " auditorium not found"
            });
        });
    });
    

});

describe('updating auditorium ',() => {
    it('Return 200 status when the update is done successfully',() => {
        return request(app)
        .patch('/api/auditorium/2')
        .set("Accept", `application/json`)
        .send({

            //auditoriumId: 2,
            auditoriumName: "cineplus",
            seats: 4
        })
        .expect(200)
        .then((response) => {
            expect({
                success : 1,
                message : "update done successfully" 
            });
        });
    });
    it('return 404 status when the data is not correct' ,() => {
        return request (app)
        .patch('/api/auditorium/2')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        //.set('Cookie','token' + token)
        .send({
            auditoriumId: 2,
            auditoriumName: 2,
            seats: 6

        })
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the auditorium"
            });
        });
        
    });
    it('return 403 status when the request is forbidden' ,() => {
        return request (app)
        .patch('/api/auditorium/2')
        .set("Accept", `application/json`)
        .set('Content','application/json')
        .send({
            auditoriumId: 2,
            auditoriumName: 2,
            seats: 5

        })
        .expect(403)
        .then((response) => {
            expect({
                success : 0,
                message : "failedto update the auditorium"
            });
        });
        
    });
});
describe('Delete auditorium', () => {
    it('Return 201 status on deleting the auditorium of provided auditorium id',() =>{
        return request(app)
        .delete('/api/auditorium/2')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(201)
        .then((response) => {
            expect({
                success : 1,
                message : "auditorium was deleted successfully"
            });
        });
    });
    it('Return 404 status when auditorium id doesnot exist',() =>{
        return request(app)
        .delete('/api/auditorium/2')
        .set('Accept','application/json')
        .set('Content-Type','application/json')
        .expect(404)
        .then((response) => {
            expect({
                success : 0,
                message : "the auditorium Id does not exist"
            });
        });
    });
})