"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersRoute = _interopRequireDefault(require("./usersRoute"));

var _accountsRoute = _interopRequireDefault(require("./accountsRoute"));

var _transactionRoute = _interopRequireDefault(require("./transactionRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/users', _usersRoute["default"]);
router.use('/accounts', _accountsRoute["default"]);
router.use('/transactions', _transactionRoute["default"]);
var _default = router;
exports["default"] = _default;