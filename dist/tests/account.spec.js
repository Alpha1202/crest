"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('API Tests', function () {
  var account = {
    id: 4,
    accountNumber: '123456',
    ownerId: 3,
    type: 'savings',
    status: 'active',
    openingBalance: 123456
  };
  describe('create new account', function () {
    it('should not POST a new account because there is no token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/accounts').send(account).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('activate or deactivate an account', function () {
    it('should not be able to activate or deactivate an account because there is no token', function (done) {
      _chai["default"].request(_server["default"]).patch('/api/v1/accounts/12345').send().end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('delete an account', function () {
    it('should not be able to delete an account because there is no token', function (done) {
      _chai["default"].request(_server["default"])["delete"]('/api/v1/accounts/12345').send().end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});