import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import mockData from '../dummyData.json';
import db from '../../db/index';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const {
  validUser1,
  validAdmin1,
  validUserSignup,
  validCashierSignup,
  validAdminSignup,
  invalidEmail,
  missingEmail,
  missingFirstName,
  emptyFirstName,
  invalidFirstName,
  anotherInvalidFirstName,
  missingLastName,
  invalidLastName,
  anotherInvalidLastName,
  missingPassword,
  validUserSignin,
  invalidUserSignin,
  anotherInvalidUserSignin,
  validAdminToken,
  invalidCashierSignup,
} = mockData.Users;

describe('Connections', () => {

  const deleteQuery = 'DELETE FROM users returning *';
  const addQuery = `INSERT INTO users
  ( email, firstName, lastName, password, type, isAdmin)
  VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values = [
    'test@gmail.com',
    'test',
    'roger',
    '123456',
    'client',
    false,
  ];

  const anotherQuery = `INSERT INTO users
  ( email, firstName, lastName, password, type, isAdmin)
  VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values1 = [
    'test1@gmail.com',
    'test',
    'roger',
    '123456',
    'client',
    false,
  ];

  const adminQuery = `INSERT INTO users
  ( email, firstName, lastName, password, type, isAdmin)
  VALUES($1, $2, $3, $4, $5, $6) returning *`;
  const values2 = [
    'test3@gmail.com',
    'test',
    'roger',
    '123456',
    'staff',
    false,
  ];

  before(async () => {
    await db.query(deleteQuery);
    await db.query(addQuery, values);
    await db.query(anotherQuery, values1);
    await db.query(adminQuery, values2);
  });
  describe('API Route Test: ', () => {
    
    describe('POST: /api/v1/users', () => {
      it('should create a new admin/staff account when all conditions are met', (done) => {
        chai.request(app)
          .post('/api/v1/users')
          .set({ Authorization: validAdminToken })
          .send(validCashierSignup)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql(201);
            res.body.should.be.a('object');
            done();
          });
      });

      it('should throw error when a duplicate user account wants to be created',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(validCashierSignup)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Email already exists');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should throw error when a duplicate admin account wants to be created',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(validCashierSignup)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Email already exists');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when email is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(invalidCashierSignup)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Invalid Email');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow user to be created when email is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(missingEmail)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Please enter your email');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when first Name field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(missingFirstName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Please enter your First Name');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when any field is empty',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(emptyFirstName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Please enter your First Name');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when first name is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(invalidFirstName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Only alphabets are allowed, white spaces are not allowed');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when first name is less than two(2) characters',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(anotherInvalidFirstName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('First Name should be atleast 3 letters');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when last Name field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(missingLastName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Please enter your Last Name');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when last name is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(invalidLastName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Only alphabets are allowed');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow admin to be created when password field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/users')
            .set({ Authorization: validAdminToken })
            .send(missingPassword)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Please enter your password');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

















































    });


  });

});
