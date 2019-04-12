"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accountsController = _interopRequireDefault(require("../controllers/accountsController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _accountMiddleware = _interopRequireDefault(require("../middleware/accountMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var accountsRouter = _express["default"].Router();

accountsRouter.post('/', _auth["default"].checkToken, _accountMiddleware["default"].validateType, _accountMiddleware["default"].validateOpeningBalance, _accountsController["default"].createAccount);
accountsRouter.patch('/:accountNumber', _auth["default"].checkToken, _accountMiddleware["default"].validateAccountNumber, _accountMiddleware["default"].validateStatus, _accountsController["default"].updateAccountStatus);
accountsRouter["delete"]('/:accountNumber', _auth["default"].checkToken, _accountMiddleware["default"].validateAccountNumber, _accountsController["default"].deleteAccount);
var _default = accountsRouter;
exports["default"] = _default;