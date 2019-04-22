/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
  const user = {
    email: 'chidinma1@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
    type: 'client',
    isAdmin: false,
  };
  const user2 = {
    email: 'chidinma@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
  };
  const user3 = {
    email: 'nzubennamani199@gmail. com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
    type: 'client',
    isAdmin: false,
  };
  const user4 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nz',
    lastName: 'Nnamani',
    password: '123456',
  };
  const user5 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nn',
    password: '123456',
  };
  const user6 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123',
  };

  const user7 = {
    password: '123456',
  };
  const user8 = {
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123',
    type: 'client',
    isAdmin: false,
  };
  const user9 = {
    email: undefined,
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123',
  };
  const user10 = {
    email: '',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123',
  };

  // describe('User sign Up', () => {
  //   it('should POST a new user sign up', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/users/auth/signup')
  //       .send(user)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         done();
  //       });
  //   });
  // });

 
  describe('User sign In', () => {
    it('should POST a new user sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signin')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('User sign In', () => {
    it('should not be able to POST a new user sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signin')
        .send(user7)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your email');
          done();
        });
    });
  });
});
