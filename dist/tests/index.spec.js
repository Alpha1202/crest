"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Server', function () {
  describe('App', function () {
    it('should run when started', function (done) {
      _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Welcome to crest finance APIs');
        done();
      });
    });
  });
});