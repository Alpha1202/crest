/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
  const user = {
    email: 'nzube@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
  };
  const user2 = {
    email: 'nzubennamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
  };
  const user3 = {
    email: 'nzubennamani@gmail .com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456',
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

  describe('User sign Up', () => {
    it('should POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          firstName: 'Nzubechukwu',
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Email already exists');
          done();
        });
    });
  });

  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Invalid Email');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user8)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your email');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user9)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your email');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user10)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your email');
          done();
        });
    });
  });

  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user4)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('First Name should be atleast 3 letters');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your First Name');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          firstName: undefined,
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your First Name');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          firstName: '',
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Please enter your First Name');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          firstName: 'yann i',
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Only alphabets are allowed, white spaces are not allowed');
          done();
        });
    });
  });

  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          email: 'nzubennamani@gmail.com',
          firstName: 'N',
          lastName: 'Nnamani',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('First Name should be atleast 3 letters');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Last Name should be atleast 3 letters');
          done();
        });
    });
  });
  describe('User sign Up', () => {
    it('should not be able to POST a new user sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(user6)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.equal('Email already exists');
          done();
        });
    });
  });

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
          res.body.error.should.equal('Email does not exist');
          done();
        });
    });
  });
});
