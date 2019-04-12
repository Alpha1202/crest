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
    validUser = _mockData$Users.validUser,
    validUserToken = _mockData$Users.validUserToken,
    validAdminToken = _mockData$Users.validAdminToken,
    anotherInvalidAdminToken = _mockData$Users.anotherInvalidAdminToken;
var _mockData$Accounts = _mockData["default"].Accounts,
    validAccount = _mockData$Accounts.validAccount,
    createNewAccount = _mockData$Accounts.createNewAccount,
    invalidNewAccount = _mockData$Accounts.invalidNewAccount,
    anotherInvalidNewAccount = _mockData$Accounts.anotherInvalidNewAccount,
    missingOpeningBalance = _mockData$Accounts.missingOpeningBalance,
    invalidOpeningBalance = _mockData$Accounts.invalidOpeningBalance,
    anotherInvalidAccount = _mockData$Accounts.anotherInvalidAccount,
    invalidStatus = _mockData$Accounts.invalidStatus;
describe('API Routes Test: ', function () {
  describe('POST: /api/v1/accounts', function () {
    it('should create a new user account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validUserToken
      }).send(createNewAccount).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should allow an admin to create a new user account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validAdminToken
      }).send(createNewAccount).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Admin is not authorized');
        done();
      });
    });
    it('should not allow a user create a bank acount when account type is not specified or is undefined', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validUserToken
      }).send(invalidNewAccount).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('please enter account type, savings or current');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow a user create a bank acount when account type is not an alphabet', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validUserToken
      }).send(anotherInvalidNewAccount).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Only alphabets are allowed, white spaces are not allowed');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow a user create a bank acount when opening Balance is not specified or is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validUserToken
      }).send(missingOpeningBalance).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('please specify your opening Balance');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow a user create a bank acount when opening Balance is not a valid amount', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').set({
        Authorization: validUserToken
      }).send(invalidOpeningBalance).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter a valid amount');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});
describe('PATCH: /api/v1/accounts/:accountNumber', function () {
  it('should patch an account when all conditions are met', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/accounts/23451').set({
      Authorization: validAdminToken
    }).send(validAccount).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('status').eql(200);
      res.body.should.be.a('object');
      done();
    });
  });
  describe('PATCH: /api/v1/accounts/:accountNumber', function () {
    it('should not allow non-admin to patch an account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).patch('/api/v1/accounts/23451').set({
        Authorization: validUserToken
      }).send(validAccount).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('status').eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Only Admin is authorized');
        done();
      });
    });
    describe('PATCH: /api/v1/accounts/:accountNumber', function () {
      it('should not allow patch account when an invalid token is passed', function (done) {
        _chai["default"].request(_server["default"]).patch('/api/v1/accounts/23451').set({
          Authorization: anotherInvalidAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Forbidden');
          done();
        });
      });
    });
    describe('PATCH: /api/v1/accounts/:accountNumber', function () {
      it('should not allow patch account when an invalid account number is passed', function (done) {
        _chai["default"].request(_server["default"]).patch('/api/v1/accounts/2345561').set({
          Authorization: validAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Account Number 2345561 does not exist');
          done();
        });
      });
    });
    describe('PATCH: /api/v1/accounts/:accountNumber', function () {
      it('should not allow patch account when an invalid account number is passed', function (done) {
        _chai["default"].request(_server["default"]).patch('/api/v1/accounts/abcnde').set({
          Authorization: validAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please enter a valid account Number');
          done();
        });
      });
    });
    describe('PATCH: /api/v1/accounts/:accountNumber', function () {
      it('should not allow patch account when status is empty or undefined', function (done) {
        _chai["default"].request(_server["default"]).patch('/api/v1/accounts/23451').set({
          Authorization: validAdminToken
        }).send(anotherInvalidAccount).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('please specify the account status, please specify dormant or active');
          done();
        });
      });
    });
    describe('PATCH: /api/v1/accounts/:accountNumber', function () {
      it('should not allow patch account when status is not a valid alphabet', function (done) {
        _chai["default"].request(_server["default"]).patch('/api/v1/accounts/23451').set({
          Authorization: validAdminToken
        }).send(invalidStatus).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Invalid account status, please specify dormant or active');
          done();
        });
      });
    });
    describe('DELETE: /api/v1/accounts/:accountNumber', function () {
      it('should delete an account when all conditions are met', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/23451').set({
          Authorization: validAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account successfully deleted');
          done();
        });
      });
    });
    describe('DELETE: /api/v1/accounts/:accountNumber', function () {
      it('should not delete an account when an invalid token is passed', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/23451').set({
          Authorization: anotherInvalidAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Forbidden');
          done();
        });
      });
    });
    describe('DELETE: /api/v1/accounts/:accountNumber', function () {
      it('should not allow a user to delete an account', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/23451').set({
          Authorization: validUserToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.have.property('status').eql(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Only Admin is authorized');
          done();
        });
      });
    });
    describe('DELETE: /api/v1/accounts/:accountNumber', function () {
      it('should not allow an account to be deleted when an invalid account number is passed', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/23432451').set({
          Authorization: validAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No account with that account number');
          done();
        });
      });
    });
    describe('DELETE: /api/v1/accounts/:accountNumber', function () {
      it('should not allow an account to be deleted when an invalid account number is passed', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/abcded').set({
          Authorization: validAdminToken
        }).send(validAccount).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please enter a valid account Number');
          done();
        });
      });
    });
  });
});