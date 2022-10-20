const request = require('superfast');
const app = require('../app');

it('return status 201 at signup if valid', () => {
  return request(app)
  .post('/api/users')
  .send({
    name : 'test',
    userType : 'admin',
    email :'test@gmail.com',
    passcode : '1234' 
  })
  .then((reponse) => {
    expect(response.status).toBe(201);
    done();
  });
  
});

it('return status 400 if credential is not valid', () => {
    return request(app)
    .post('/api/users')
    .send({
      name : '1233',
      userType : 'admin',
      email :'test@gmail.com',
      passcode : '1234' 
    })
    .then((reponse) => {
      expect(response.status).toBe(400);
      done();
    });
    
    
  });