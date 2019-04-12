"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('API Tests', function () {
  var user = {
    email: 'nzube@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456'
  };
  var user2 = {
    email: 'nzubennamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456'
  };
  var user3 = {
    email: 'nzubennamani@gmail .com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123456'
  };
  var user4 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nz',
    lastName: 'Nnamani',
    password: '123456'
  };
  var user5 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nn',
    password: '123456'
  };
  var user6 = {
    email: 'nnamani@gmail.com',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123'
  };
  var user7 = {
    password: '123456'
  };
  var user8 = {
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123'
  };
  var user9 = {
    email: undefined,
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123'
  };
  var user10 = {
    email: '',
    firstName: 'Nzubechukwu',
    lastName: 'Nnamani',
    password: '123'
  };
  describe('User sign Up', function () {
    it('should POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        firstName: 'Nzubechukwu',
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Email already exists');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user3).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Invalid Email');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user8).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your email');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user9).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your email');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user10).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your email');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user4).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('First Name should be atleast 3 letters');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your First Name');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        firstName: undefined,
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your First Name');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        firstName: '',
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Please enter your First Name');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        firstName: 'yann i',
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Only alphabets are allowed, white spaces are not allowed');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send({
        email: 'nzubennamani@gmail.com',
        firstName: 'N',
        lastName: 'Nnamani',
        password: '123456'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('First Name should be atleast 3 letters');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user5).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Last Name should be atleast 3 letters');
        done();
      });
    });
  });
  describe('User sign Up', function () {
    it('should not be able to POST a new user sign up', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signup').send(user6).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Email already exists');
        done();
      });
    });
  });
  describe('User sign In', function () {
    it('should POST a new user sign in', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(user2).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('User sign In', function () {
    it('should not be able to POST a new user sign in', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/users/auth/signin').send(user7).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('Email does not exist');
        done();
      });
    });
  });
});