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
    validAdmin = _mockData$Users.validAdmin,
    validUserSignup = _mockData$Users.validUserSignup,
    validAdminSignup = _mockData$Users.validAdminSignup,
    invalidEmail = _mockData$Users.invalidEmail,
    missingEmail = _mockData$Users.missingEmail,
    missingFirstName = _mockData$Users.missingFirstName,
    emptyFirstName = _mockData$Users.emptyFirstName,
    invalidFirstName = _mockData$Users.invalidFirstName,
    anotherInvalidFirstName = _mockData$Users.anotherInvalidFirstName,
    missingLastName = _mockData$Users.missingLastName,
    invalidLastName = _mockData$Users.invalidLastName,
    anotherInvalidLastName = _mockData$Users.anotherInvalidLastName,
    missingPassword = _mockData$Users.missingPassword,
    validUserSignin = _mockData$Users.validUserSignin,
    invalidUserSignin = _mockData$Users.invalidUserSignin,
    anotherInvalidUserSignin = _mockData$Users.anotherInvalidUserSignin;
describe('API Route Test: ', function () {
  describe('POST: /api/v1/users/auth/signup', function () {
    it('should create a new user account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(validUserSignup).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should create a new Admin/staff user account when all conditions are met', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(validAdminSignup).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should throw error when a duplicate user account wants to be created', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(validUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Email already exists');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should throw error when a duplicate admin account wants to be created', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(validAdmin).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Email already exists');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when email is invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(invalidEmail).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Invalid Email');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when email is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(missingEmail).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter your email');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when first Name field is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(missingFirstName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter your First Name');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when any field is empty', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(emptyFirstName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter your First Name');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when first name is invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(invalidFirstName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Only alphabets are allowed, white spaces are not allowed');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when first name is less than two(2) characters', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(anotherInvalidFirstName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('First Name should be atleast 3 letters');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when last Name field is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(missingLastName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter your Last Name');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when last name is invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(invalidLastName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Only alphabets are allowed');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when last name is less than two(2) characters', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(anotherInvalidLastName).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Last Name should be atleast 3 letters');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to be created when password field is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(missingPassword).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Please enter your password');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('POST: /api/v1/users/auth/signin', function () {
    it('should sigin a new user account when all conditions are met and token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(validUserSignin).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not sigin a new user account when email does not exist', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(invalidUserSignin).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Email does not exist');
        done();
      });
    });
    it('should not sigin a new user account when password is incorrect', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(anotherInvalidUserSignin).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('incorrect password');
        done();
      });
    });
    it('should not allow user to signin when email is invalid', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(invalidEmail).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Email does not exist');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
    it('should not allow user to signin when email is missing', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(missingEmail).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('error').eql('Email does not exist');
        res.body.should.have.property('status').eql(400);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});