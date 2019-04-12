"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersController = _interopRequireDefault(require("../controllers/usersController"));

var _userMiddlerware = _interopRequireDefault(require("../middleware/userMiddlerware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersRouter = _express["default"].Router();

usersRouter.post('/auth/signup', _userMiddlerware["default"].validateEmail, _userMiddlerware["default"].validateFirstName, _userMiddlerware["default"].validateLastName, _userMiddlerware["default"].validatePassword, _usersController["default"].signup);
usersRouter.post('/auth/signin', _userMiddlerware["default"].verifyUser, _userMiddlerware["default"].validateEmail, _userMiddlerware["default"].validatePassword, _usersController["default"].login);
var _default = usersRouter;
exports["default"] = _default;