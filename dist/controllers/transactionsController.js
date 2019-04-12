"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Transactions = _interopRequireDefault(require("../models/Transactions"));

var _Accounts = _interopRequireDefault(require("../models/Accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var transaction = new _Transactions["default"]();
var account = new _Accounts["default"]();

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "debit",

    /** POST a debit transaction
       * @param {object} req
       * @param {object} res
      */
    value: function debit(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.JWT_SECRET, function (err, authData) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }

        var id = authData.id,
            isAdmin = authData.isAdmin;

        if (isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'Only Admin is authorized'
          });
        }

        var accountNumber = req.params.accountNumber;
        var checkAccountNumber = account.findAccount(accountNumber);

        if (!checkAccountNumber) {
          return res.status(404).json({
            status: 404,
            error: 'Account Number does not exist'
          });
        }

        var status = checkAccountNumber.status,
            openingBalance = checkAccountNumber.openingBalance;

        if (status === 'dormant') {
          return res.status(400).json({
            status: 400,
            error: 'This account is dormant, please activate'
          });
        }

        var amount = req.body.amount;

        if (!amount || amount === 'undefined') {
          return res.status(400).json({
            status: 400,
            error: 'Please specify an amount'
          });
        }

        var oldBalance = openingBalance;

        if (oldBalance <= 0 && oldBalance < amount) {
          return res.status(400).json({
            status: 400,
            error: 'You have insufficient balance'
          });
        }

        var accountBalance = oldBalance - amount;
        checkAccountNumber.openingBalance = accountBalance;
        var debitTransaction = transaction.debit(amount);

        if (debitTransaction.saved) {
          return res.status(200).json({
            status: 200,
            data: {
              transactionId: _uuid["default"].v4(),
              accountNumber: accountNumber,
              amount: amount,
              cashier: id,
              transactionType: 'debit',
              accountBalance: accountBalance
            }
          });
        }

        return res.status(400).json({
          status: 400,
          error: 'Debit transaction failed'
        });
      });
    }
  }, {
    key: "credit",
    value: function credit(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.JWT_SECRET, function (err, authData) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }

        var id = authData.id,
            isAdmin = authData.isAdmin;

        if (isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'Only Admin is authorized'
          });
        }

        var accountNumber = req.params.accountNumber;
        var checkAccountNumber = account.findAccount(accountNumber);

        if (!checkAccountNumber) {
          return res.status(404).json({
            status: 404,
            error: 'Account Number does not exist'
          });
        }

        var status = checkAccountNumber.status,
            openingBalance = checkAccountNumber.openingBalance;

        if (status === 'dormant') {
          return res.status(400).json({
            status: 400,
            error: 'This account is dormant, please activate'
          });
        }

        var amount = req.body.amount;

        if (!amount || amount === 'undefined') {
          return res.status(400).json({
            status: 400,
            error: 'Please specify an amount'
          });
        }

        var oldBalance = openingBalance;
        var accountBalance = parseFloat(oldBalance) + parseFloat(amount);
        checkAccountNumber.openingBalance = accountBalance;
        var creditTransaction = transaction.credit(amount);

        if (creditTransaction.saved) {
          return res.status(200).json({
            status: 200,
            data: {
              transactionId: _uuid["default"].v4(),
              accountNumber: accountNumber,
              amount: amount,
              cashier: id,
              transactionType: 'Credit',
              accountBalance: parseFloat(accountBalance)
            }
          });
        }

        return res.status(400).json({
          status: 400,
          error: 'Credit transaction failed'
        });
      });
    }
  }]);

  return TransactionController;
}();

exports["default"] = TransactionController;