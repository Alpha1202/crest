/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import mockData from '../mockData.json';

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
chai.should();

const {
  validUserToken,
  validAdminToken,
  anotherInvalidAdminToken,
} = mockData.Users;

const {
  validTransaction,
  invalidTransaction,
} = mockData.Transactions;

describe('API Routes Test: ', () => {
  describe('POST: /api/v1/transactions/:accountNumber/credit', () => {
    it('should credit a users account when all conditions are met', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/12345/credit')
        .set({ Authorization: validAdminToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account when an invalid token is passed', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/12345/credit')
        .set({ Authorization: anotherInvalidAdminToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('error').eql('Forbidden');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account if its not an admin token that is passed', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/12345/credit')
        .set({ Authorization: validUserToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('error').eql('Only Admin is authorized');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account when an incorrect account number is passed', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/1233445/credit')
        .set({ Authorization: validAdminToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('Account Number does not exist');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account when account is dormant', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/23451/credit')
        .set({ Authorization: validAdminToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('This account is dormant, please activate');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account when amount is empty or undefined', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/12345/credit')
        .set({ Authorization: validAdminToken })
        .send(invalidTransaction)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Please specify an amount');
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not credit a users account when the acount number is not a valid account number', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/abcd/credit')
        .set({ Authorization: validAdminToken })
        .send(validTransaction)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Please enter a valid account Number');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});


describe('POST: /api/v1/transactions/:accountNumber/debit', () => {
  it('should debit a users account when all conditions are met', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/12345/debit')
      .set({ Authorization: validAdminToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account when an invalid token is passed', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/12345/debit')
      .set({ Authorization: anotherInvalidAdminToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Forbidden');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account if its not an admin token that is passed', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/12345/debit')
      .set({ Authorization: validUserToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Only Admin is authorized');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account when an incorrect account number is passed', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/1233445/debit')
      .set({ Authorization: validAdminToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Account Number does not exist');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account when account is dormant', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/23451/debit')
      .set({ Authorization: validAdminToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('This account is dormant, please activate');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account when amount is empty or undefined', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/12345/debit')
      .set({ Authorization: validAdminToken })
      .send(invalidTransaction)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Please specify an amount');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not debit a users account when the acount number is not a valid account number', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/abcd/debit')
      .set({ Authorization: validAdminToken })
      .send(validTransaction)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Please enter a valid account Number');
        res.body.should.be.a('object');
        done();
      });
  });
});
