"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var date = new Date();

var Transactions =
/*#__PURE__*/
function () {
  /**
     * class constructor
     * @param {object} transaction
     */
  function Transactions() {
    _classCallCheck(this, Transactions);

    this.transactions = [{
      id: _uuid["default"].v4(),
      createdOn: date,
      type: 'credit',
      accountNumber: '000333112',
      cashier: 23,
      amount: 23456,
      oldBalance: '1200000',
      newBalance: '180000'
    }];
  }
  /**
     * @param {object} new transaction object
     * @returns {object} transaction object
     */


  _createClass(Transactions, [{
    key: "credit",
    value: function credit(transaction) {
      var creditTransaction = {
        id: _uuid["default"].v4(),
        createdOn: date,
        type: 'credit',
        accountNumber: transaction.accountNumber,
        cashier: transaction.cashier,
        amount: transaction.amount,
        oldBalance: transaction.oldBalance,
        newBalance: transaction.newBalance
      };
      var saveTransaction = this.transactions.push(creditTransaction);

      if (saveTransaction) {
        return {
          saveTransaction: saveTransaction,
          saved: true
        };
      }

      return {
        saved: false
      };
    }
  }, {
    key: "debit",
    value: function debit(transaction) {
      var debitTransaction = {
        id: _uuid["default"].v4(),
        createdOn: date,
        type: 'debit',
        accountNumber: transaction.accountNumber,
        cashier: transaction.cashier,
        amount: transaction.amount,
        oldBalance: transaction.oldBalance,
        newBalance: transaction.newBalance
      };
      var saveTransaction = this.transactions.push(debitTransaction);

      if (saveTransaction) {
        return {
          saveTransaction: saveTransaction,
          saved: true
        };
      }

      return {
        saved: false
      };
    }
  }]);

  return Transactions;
}();

exports["default"] = Transactions;