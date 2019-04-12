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
var validateTransactions =
/*#__PURE__*/
function () {
  function validateTransactions() {
    _classCallCheck(this, validateTransactions);
  }

  _createClass(validateTransactions, null, [{
    key: "validateAmount",

    /**
       * validates inputs for debit/credit transactions
       * @params {object} req
       * @params {object} res
       * @returns {object} a transaction object
       */
    value: function validateAmount(req, res, next) {
      var amount = req.body.amount;

      if (!amount || amount === 'undefined' || amount === '') {
        return res.status(400).json({
          status: 400,
          error: 'please specify an amount'
        });
      }

      var numericRegExp = /^[0-9]+$/;

      if (!amount.match(numericRegExp)) {
        return res.status(400).json({
          status: 400,
          error: 'Please enter a valid amount'
        });
      }

      next();
    }
  }]);

  return validateTransactions;
}();

exports["default"] = validateTransactions;