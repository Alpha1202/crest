"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var user = new _User["default"]();
/**
     *@class validate
  */

var validate =
/*#__PURE__*/
function () {
  function validate() {
    _classCallCheck(this, validate);
  }

  _createClass(validate, null, [{
    key: "validateEmail",

    /**
       * validates inputs for creating a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */
    value: function validateEmail(req, res, next) {
      var email = req.body.email;

      if (!email || email === 'undefined' || email === '') {
        return res.status(400).json({
          status: 400,
          error: 'Please enter your email'
        });
      }

      var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email.match(emailExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid Email'
        });
      }

      next();
    }
    /**
       * validates inputs for creating a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */

  }, {
    key: "validateFirstName",
    value: function validateFirstName(req, res, next) {
      var firstName = req.body.firstName;

      if (!firstName || firstName === 'undefined' || firstName === '') {
        return res.status(400).json({
          status: 400,
          error: 'Please enter your First Name'
        });
      }

      var alphaRegExp = /^[a-zA-Z]+$/;

      if (!firstName.match(alphaRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Only alphabets are allowed, white spaces are not allowed'
        });
      }

      if (firstName.length <= 2) {
        return res.status(400).json({
          status: 400,
          error: 'First Name should be atleast 3 letters'
        });
      }

      next();
    }
    /**
       * validates inputs for creating a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */

  }, {
    key: "validateLastName",
    value: function validateLastName(req, res, next) {
      var lastName = req.body.lastName;

      if (!lastName || lastName === 'undefined' || lastName === '') {
        return res.status(400).json({
          status: 400,
          error: 'Please enter your Last Name'
        });
      }

      var alphaRegExp = /^[a-zA-Z]+$/;

      if (!lastName.match(alphaRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Only alphabets are allowed'
        });
      }

      if (lastName.length <= 2) {
        return res.status(400).json({
          status: 400,
          error: 'Last Name should be atleast 3 letters'
        });
      }

      next();
    }
    /**
       * validates inputs for creating or logging a user
       * @params {object} req
       * @params {object} res
       * @returns {object} a user object
       */

  }, {
    key: "validatePassword",
    value: function validatePassword(req, res, next) {
      var password = req.body.password;

      if (!password || password === 'undefined' || password === '') {
        return res.status(400).json({
          status: 400,
          error: 'Please enter your password'
        });
      }

      if (!password.length >= 7 && password.length <= 15) {
        return res.status(400).json({
          status: 400,
          error: 'Password should be atleast 7 characters'
        });
      }

      next();
    }
    /**
       * validates inputs for signin in a user
       * @params {object} req
       * @params {object} res
       * @returns {object} signed in user object
       */

  }, {
    key: "verifyUser",
    value: function verifyUser(req, res, next) {
      var newUser = user.findAllUser();
      var found = newUser.find(function (auser) {
        return auser.email === req.body.email;
      });

      if (!found) {
        return res.status(400).json({
          status: 400,
          error: 'Email does not exist'
        });
      }

      if (found.password !== req.body.password) {
        return res.status(400).json({
          status: 400,
          error: 'incorrect password'
        });
      }

      next();
    }
  }]);

  return validate;
}();

exports["default"] = validate;