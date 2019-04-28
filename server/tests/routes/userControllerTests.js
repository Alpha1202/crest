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
    
    describe('POST: /api/v1/auth/signup', () => {
      it('should create a new user account when all conditions are met', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(validUserSignup)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql(201);
            res.body.should.be.a('object');
            done();
          });
      });

      it('should create a new Admin/staff user account when all conditions are met', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(validAdminSignup)
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
            .post('/api/v1/auth/signup')
            .send(validUserSignup)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.have.property('error')
                .eql('Email already exists');
              res.body.should.have.property('status')
                .eql(409);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should throw error when a duplicate admin account wants to be created',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(validAdminSignup)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.have.property('error')
                .eql('Email already exists');
              res.body.should.have.property('status')
                .eql(409);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow user to be created when email is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(invalidEmail)
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
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when first Name field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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


      it('should not allow user to be created when any field is empty',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when first name is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when first name is less than two(2) characters',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when last Name field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when last name is invalid',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      it('should not allow user to be created when last name is less than two(2) characters',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(anotherInvalidLastName)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error')
                .eql('Last Name should be atleast 3 letters');
              res.body.should.have.property('status')
                .eql(400);
              res.body.should.be.a('object');
              done();
            });
        });

      it('should not allow user to be created when password field is missing',
        (done) => {
          chai.request(app)
            .post('/api/v1/auth/signup')
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

      describe('POST: /api/v1/auth/signin', () => {

        it('should sigin a new user account when all conditions are met and token', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signin')
            .send(validUserSignin)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status').eql(200);
              res.body.should.be.a('object');
              done();
            });
        });

        it('should not sigin a new user account when email does not exist', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signin')
            .send(invalidUserSignin)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('status').eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error')
                .eql('User does not exist');
              done();
            });
        });

        it('should not signin a new user account when password is incorrect', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signin')
            .send(anotherInvalidUserSignin)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('status').eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error')
                .eql('Password should be atleast 6 characters');
              done();
            });
        });

        it('should not allow user to signin when email is invalid',
          (done) => {
            chai.request(app)
              .post('/api/v1/auth/signin')
              .send(invalidEmail)
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

        it('should not allow user to signin when email is missing',
          (done) => {
            chai.request(app)
              .post('/api/v1/auth/signin')
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























      });















































    });
  });
})
