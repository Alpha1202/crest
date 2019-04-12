"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactionsController = _interopRequireDefault(require("../controllers/transactionsController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _accountMiddleware = _interopRequireDefault(require("../middleware/accountMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionRouter = _express["default"].Router();

transactionRouter.post('/:accountNumber/debit', _auth["default"].checkToken, _accountMiddleware["default"].validateAccountNumber, _transactionsController["default"].debit);
transactionRouter.post('/:accountNumber/credit', _auth["default"].checkToken, _accountMiddleware["default"].validateAccountNumber, _transactionsController["default"].credit);
var _default = transactionRouter;
exports["default"] = _default;