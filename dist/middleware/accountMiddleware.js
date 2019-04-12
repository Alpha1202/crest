"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable consistent-return */

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
    key: "validateType",

    /**
         * validates inputs for creating account
         * @params {object} req
         * @params {object} res
         * @returns {object} a newly created account object
         */
    value: function validateType(req, res, next) {
      var type = req.body.type;

      if (!type || type === 'undefined' || type === '') {
        return res.status(400).json({
          status: 400,
          error: 'please enter account type, savings or current'
        });
      }

      var alphaRegExp = /^[a-zA-Z]+$/;

      if (!type.match(alphaRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Only alphabets are allowed, white spaces are not allowed'
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
    key: "validateOpeningBalance",
    value: function validateOpeningBalance(req, res, next) {
      var openingBalance = req.body.openingBalance;

      if (!openingBalance || openingBalance === 'undefined' || openingBalance === '') {
        return res.status(400).json({
          status: 400,
          error: 'please specify your opening Balance'
        });
      }

      var numericRegExp = /^[0-9]+$/;

      if (!openingBalance.match(numericRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Please enter a valid amount'
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
    key: "validateStatus",
    value: function validateStatus(req, res, next) {
      var status = req.body.status;

      if (!status || status === 'undefined' || status === '') {
        return res.status(400).json({
          status: 400,
          error: 'please specify the account status, please specify dormant or active'
        });
      }

      var alphaRegExp = /^[a-zA-Z]+$/;

      if (!status.match(alphaRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid account status, please specify dormant or active'
        });
      }

      next();
    }
  }, {
    key: "validateAccountNumber",
    value: function validateAccountNumber(req, res, next) {
      var accountNumber = req.params.accountNumber;
      var numericRegExp = /^[0-9]+$/;

      if (!accountNumber.match(numericRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Please enter a valid account Number'
        });
      }

      next();
    }
  }]);

  return validate;
}();

exports["default"] = validate;