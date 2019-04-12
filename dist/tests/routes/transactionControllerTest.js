"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../../server"));

var _mockData = _interopRequireDefault(require("../mockData.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */

/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = 'test';

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var _mockData$Users = _mockData["default"].Users,
    validUserToken = _mockData$Users.validUserToken,
    validAdminToken = _mockData$Users.validAdminToken,
    anotherInvalidAdminToken = _mockData$Users.anotherInvalidAdminToken;
var _mockData$Transaction = _mockData["default"].Transactions,
    validTransaction = _mockData$Transaction.validTransaction,
    invalidTransaction = _mockData$Transaction.invalidTransaction;
describe('API Routes Test: ', function () {
  describe('POST: /api/v1/transactions/:accountNumber/credit', function () {
    it('should credit a users account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/credit').set({
        Authorization: validAdminToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account when an invalid token is passed', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/credit').set({
        Authorization: anotherInvalidAdminToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Forbidden');
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account if its not an admin token that is passed', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/credit').set({
        Authorization: validUserToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error').eql('Only Admin is authorized');
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account when an incorrect account number is passed', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/1233445/credit').set({
        Authorization: validAdminToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Account Number does not exist');
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account when account is dormant', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/23451/credit').set({
        Authorization: validAdminToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('This account is dormant, please activate');
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account when amount is empty or undefined', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/credit').set({
        Authorization: validAdminToken
      }).send(invalidTransaction).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Please specify an amount');
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not credit a users account when the acount number is not a valid account number', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/abcd/credit').set({
        Authorization: validAdminToken
      }).send(validTransaction).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Please enter a valid account Number');
        res.body.should.be.a('object');
        done();
      });
    });
  });
});
describe('POST: /api/v1/transactions/:accountNumber/debit', function () {
  it('should debit a users account when all conditions are met', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/debit').set({
      Authorization: validAdminToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('status').eql(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account when an invalid token is passed', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/debit').set({
      Authorization: anotherInvalidAdminToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('status').eql(403);
      res.body.should.have.property('error').eql('Forbidden');
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account if its not an admin token that is passed', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/debit').set({
      Authorization: validUserToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('status').eql(403);
      res.body.should.have.property('error').eql('Only Admin is authorized');
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account when an incorrect account number is passed', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/1233445/debit').set({
      Authorization: validAdminToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').eql('Account Number does not exist');
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account when account is dormant', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/23451/debit').set({
      Authorization: validAdminToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('This account is dormant, please activate');
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account when amount is empty or undefined', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/debit').set({
      Authorization: validAdminToken
    }).send(invalidTransaction).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('Please specify an amount');
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not debit a users account when the acount number is not a valid account number', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/transactions/abcd/debit').set({
      Authorization: validAdminToken
    }).send(validTransaction).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('Please enter a valid account Number');
      res.body.should.be.a('object');
      done();
    });
  });
});