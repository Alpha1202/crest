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

var accountNumberPrefix = '00';
var generateAccountNumber = Date.now();
var newAccountNumber = accountNumberPrefix + generateAccountNumber;
var date = new Date();

var Account =
/*#__PURE__*/
function () {
  /**
     * class constructor
     * @param {object} account
     */
  function Account() {
    _classCallCheck(this, Account);

    this.accounts = [{
      id: _uuid["default"].v4(),
      accountNumber: '12345',
      ownerId: 2,
      type: 'current',
      status: 'active',
      openingBalance: '10000',
      createdOn: date
    }, {
      id: _uuid["default"].v4(),
      accountNumber: '23451',
      ownerId: 2,
      type: 'current',
      status: 'dormant',
      openingBalance: '0',
      createdOn: date
    }, {
      id: _uuid["default"].v4(),
      accountNumber: '34251',
      ownerId: 2,
      type: 'current',
      status: 'active',
      openingBalance: '0',
      createdOn: date
    }];
  }
  /**
     * @param {object} new account object
     * @returns {object} account object
     */


  _createClass(Account, [{
    key: "create",
    value: function create(account) {
      var newAccount = {
        id: _uuid["default"].v4(),
        accountNumber: newAccountNumber,
        ownerId: account.ownerId,
        type: account.type,
        status: 'dormant',
        openingBalance: 0,
        createdOn: date
      };
      var saveAccount = this.accounts.push(newAccount);

      if (saveAccount) {
        return {
          newAccount: newAccount,
          saved: true
        };
      }

      return {
        saved: false
      };
    }
    /**
       * @param {uuid} accountNumber
       * @returns {object} account object
       */

  }, {
    key: "findAccount",
    value: function findAccount(accountNumber) {
      return this.accounts.find(function (acc) {
        return acc.accountNumber === accountNumber;
      });
    }
    /**
       * @returns {object} stores account to the dummy database
       */

  }, {
    key: "save",
    value: function save(data) {
      return this.accounts.push(data);
    }
    /**
       * @param {} accountNumber
       * @returns {object} all accounts excluding the deleted account
       */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(accountNumber) {
      var found = this.findAccount(accountNumber);
      var foundIndex = this.accounts.indexOf(found);
      this.accounts.splice(foundIndex, 1);
      return {};
    }
  }]);

  return Account;
}();

exports["default"] = Account;