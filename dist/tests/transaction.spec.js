"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('API Tests', function () {
  var amount = {
    amount: 5000
  };
  describe('credit an account', function () {
    it('should not credit the account because there is no token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/credit').send(amount).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  describe('debit an account', function () {
    it('should not debit the account because there is no token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/v1/transactions/12345/debit').send(amount).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});