/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import mockData from '../mockData.json';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.should();

const {
  validUser,
  validUserToken,
  validAdminToken,
  anotherInvalidAdminToken,
} = mockData.Users;

const {
  validAccount,
  createNewAccount,
  invalidNewAccount,
  anotherInvalidNewAccount,
  missingOpeningBalance,
  invalidOpeningBalance,
  anotherInvalidAccount,
  invalidStatus,
} = mockData.Accounts;


describe('API Routes Test: ', () => {
  describe('POST: /api/v1/accounts', () => {
    it('should create a new user account when all conditions are met', (done) => {
      chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: validUserToken })
        .send(createNewAccount)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should allow an admin to create a new user account when all conditions are met', (done) => {
      chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: validAdminToken })
        .send(createNewAccount)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('Admin is not authorized');
          done();
        });
    });

    it('should not allow a user create a bank acount when account type is not specified or is undefined',
      (done) => {
        chai.request(app)
          .post('/api/v1/accounts')
          .set({ Authorization: validUserToken })
          .send(invalidNewAccount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error')
              .eql('please enter account type, savings or current');
            res.body.should.have.property('status')
              .eql(400);
            res.body.should.be.a('object');
            done();
          });
      });

    it('should not allow a user create a bank acount when account type is not an alphabet',
      (done) => {
        chai.request(app)
          .post('/api/v1/accounts')
          .set({ Authorization: validUserToken })
          .send(anotherInvalidNewAccount)
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

    it('should not allow a user create a bank acount when opening Balance is not specified or is missing',
      (done) => {
        chai.request(app)
          .post('/api/v1/accounts')
          .set({ Authorization: validUserToken })
          .send(missingOpeningBalance)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error')
              .eql('please specify your opening Balance');
            res.body.should.have.property('status')
              .eql(400);
            res.body.should.be.a('object');
            done();
          });
      });

    it('should not allow a user create a bank acount when opening Balance is not a valid amount',
      (done) => {
        chai.request(app)
          .post('/api/v1/accounts')
          .set({ Authorization: validUserToken })
          .send(invalidOpeningBalance)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error')
              .eql('Please enter a valid amount');
            res.body.should.have.property('status')
              .eql(400);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});

describe('PATCH: /api/v1/accounts/:accountNumber', () => {
  it('should patch an account when all conditions are met', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/23451')
      .set({ Authorization: validAdminToken })
      .send(validAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  describe('PATCH: /api/v1/accounts/:accountNumber', () => {
    it('should not allow non-admin to patch an account when all conditions are met', (done) => {
      chai.request(app)
        .patch('/api/v1/accounts/23451')
        .set({ Authorization: validUserToken })
        .send(validAccount)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('Only Admin is authorized');
          done();
        });
    });

    describe('PATCH: /api/v1/accounts/:accountNumber', () => {
      it('should not allow patch account when an invalid token is passed', (done) => {
        chai.request(app)
          .patch('/api/v1/accounts/23451')
          .set({ Authorization: anotherInvalidAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('status').eql(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Forbidden');
            done();
          });
      });
    });

    describe('PATCH: /api/v1/accounts/:accountNumber', () => {
      it('should not allow patch account when an invalid account number is passed', (done) => {
        chai.request(app)
          .patch('/api/v1/accounts/2345561')
          .set({ Authorization: validAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('status').eql(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Account Number 2345561 does not exist');
            done();
          });
      });
    });

    describe('PATCH: /api/v1/accounts/:accountNumber', () => {
      it('should not allow patch account when an invalid account number is passed', (done) => {
        chai.request(app)
          .patch('/api/v1/accounts/abcnde')
          .set({ Authorization: validAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Please enter a valid account Number');
            done();
          });
      });
    });

    describe('PATCH: /api/v1/accounts/:accountNumber', () => {
      it('should not allow patch account when status is empty or undefined', (done) => {
        chai.request(app)
          .patch('/api/v1/accounts/23451')
          .set({ Authorization: validAdminToken })
          .send(anotherInvalidAccount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('please specify the account status, please specify dormant or active');
            done();
          });
      });
    });

    describe('PATCH: /api/v1/accounts/:accountNumber', () => {
      it('should not allow patch account when status is not a valid alphabet', (done) => {
        chai.request(app)
          .patch('/api/v1/accounts/23451')
          .set({ Authorization: validAdminToken })
          .send(invalidStatus)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Invalid account status, please specify dormant or active');
            done();
          });
      });
    });

    describe('DELETE: /api/v1/accounts/:accountNumber', () => {
      it('should delete an account when all conditions are met', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/23451')
          .set({ Authorization: validAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Account successfully deleted');
            done();
          });
      });
    });

    describe('DELETE: /api/v1/accounts/:accountNumber', () => {
      it('should not delete an account when an invalid token is passed', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/23451')
          .set({ Authorization: anotherInvalidAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('status').eql(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Forbidden');
            done();
          });
      });
    });

    describe('DELETE: /api/v1/accounts/:accountNumber', () => {
      it('should not allow a user to delete an account', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/23451')
          .set({ Authorization: validUserToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('status').eql(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Only Admin is authorized');
            done();
          });
      });
    });

    describe('DELETE: /api/v1/accounts/:accountNumber', () => {
      it('should not allow an account to be deleted when an invalid account number is passed', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/23432451')
          .set({ Authorization: validAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('status').eql(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('No account with that account number');
            done();
          });
      });
    });

    describe('DELETE: /api/v1/accounts/:accountNumber', () => {
      it('should not allow an account to be deleted when an invalid account number is passed', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/abcded')
          .set({ Authorization: validAdminToken })
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error')
              .eql('Please enter a valid account Number');
            done();
          });
      });
    });

  });
});
