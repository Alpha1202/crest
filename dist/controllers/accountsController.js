"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Accounts = _interopRequireDefault(require("../models/Accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var account = new _Accounts["default"]();
/**
 *@class account controller
 */

var AccountsController =
/*#__PURE__*/
function () {
  function AccountsController() {
    _classCallCheck(this, AccountsController);
  }

  _createClass(AccountsController, null, [{
    key: "createAccount",

    /**
     * Create a new account
     * @param {object} req
     * @param {object} res
     * @return {object} created account
     */
    value: function createAccount(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.JWT_SECRET, function (err, authData) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }

        var firstName = authData.firstName,
            lastName = authData.lastName,
            email = authData.email,
            isAdmin = authData.isAdmin;

        if (isAdmin === true) {
          return res.status(403).json({
            status: 403,
            error: 'Admin is not authorized'
          });
        }

        var type = req.body.type;
        var saveAccount = account.create({
          type: type
        });

        if (saveAccount.saved) {
          return res.status(201).json({
            status: 201,
            data: {
              id: saveAccount.newAccount.id,
              accountNumber: saveAccount.newAccount.accountNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              type: saveAccount.newAccount.type,
              status: saveAccount.newAccount.status,
              openingBalance: saveAccount.newAccount.openingBalance
            }
          });
        }

        return res.status(400).json({
          status: 400,
          error: 'Account not created successfully'
        });
      });
    }
    /**
     * Activate or Deactivate an account
     * @param {object} req
     * @param {object} res
     * @return {object} PATCHed account
     */

  }, {
    key: "updateAccountStatus",
    value: function updateAccountStatus(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.JWT_SECRET, function (err, authData) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }

        var isAdmin = authData.isAdmin;

        if (isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'Only Admin is authorized'
          });
        }

        var accountNumber = req.params.accountNumber;
        var found = account.findAccount(accountNumber);

        if (!found) {
          return res.status(404).json({
            status: 404,
            error: "Account Number ".concat(accountNumber, " does not exist")
          });
        }

        var id = found.id,
            ownerId = found.ownerId,
            type = found.type,
            status = found.status,
            openingBalance = found.openingBalance,
            createdOn = found.createdOn;

        if (found.status === 'active') {
          found.status = 'dormant';
          account.save(found);
          return res.status(200).json({
            status: 200,
            data: {
              accountNumber: accountNumber,
              status: status,
              id: id,
              ownerId: ownerId,
              type: type,
              openingBalance: openingBalance,
              createdOn: createdOn
            }
          });
        }

        if (found.status === 'dormant') {
          found.status = 'active';
          account.save(found);
          return res.status(200).json({
            status: 200,
            data: {
              accountNumber: accountNumber,
              status: status,
              id: id,
              ownerId: ownerId,
              type: type,
              openingBalance: openingBalance,
              createdOn: createdOn
            }
          });
        }
      });
    }
    /**
     * Delete an account
     * @param {object} req
     * @param {object} res
     * @return {object} all accounts except the deleted account
     */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.JWT_SECRET, function (err, authData) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }

        var isAdmin = authData.isAdmin;

        if (isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'Only Admin is authorized'
          });
        }

        var accountNumber = req.params.accountNumber;
        var found = account.findAccount(accountNumber);

        if (!found) {
          return res.status(404).json({
            status: 404,
            error: 'No account with that account number'
          });
        }

        account.deleteAccount(found);
        return res.status(200).json({
          status: 200,
          message: 'Account successfully deleted'
        });
      });
    }
  }]);

  return AccountsController;
}();

exports["default"] = AccountsController;