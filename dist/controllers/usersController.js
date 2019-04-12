"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var user = new _User["default"]();
/**
 *@class user controller
 */

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signup",

    /**
       * Create a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */
    value: function signup(req, res) {
      var someUser = user.findAllUser();
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password;
      var found = someUser.find(function (aUser) {
        return aUser.email === email;
      });

      if (found) {
        return res.status(400).json({
          status: 400,
          error: 'Email already exists'
        });
      }

      var isAdmin = req.body.isAdmin || false;
      var type;
      isAdmin ? type = 'staff' : type = 'client';

      var hash = _bcrypt["default"].hashSync(password, 10);

      var saveUser = user.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hash,
        isAdmin: isAdmin,
        type: type
      });

      if (saveUser.saved) {
        var token = _jsonwebtoken["default"].sign({
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          type: type,
          isAdmin: isAdmin
        }, process.env.JWT_SECRET, {
          expiresIn: '7d'
        });

        return res.status(201).json({
          status: 201,
          data: {
            token: token,
            id: saveUser.newUser.id,
            firstName: saveUser.newUser.firstName,
            lastName: saveUser.newUser.lastName,
            email: saveUser.newUser.email.toLowerCase().trim().toString(),
            type: type,
            isAdmin: isAdmin
          }
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Registration failed, try again'
      });
    }
    /**
    * Login a user
    * @param {object} req
    * @param {object} res
    * @return {json} user logged in
    */

  }, {
    key: "login",
    value: function login(req, res) {
      var someUser = user.findAllUser();
      var email = req.body.email;
      var found = someUser.find(function (aUser) {
        return aUser.email === email;
      });
      var id = found.id,
          firstName = found.firstName,
          lastName = found.lastName,
          type = found.type,
          isAdmin = found.isAdmin;

      var token = _jsonwebtoken["default"].sign({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: found.type,
        isAdmin: found.isAdmin
      }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      return res.status(200).json({
        status: 200,
        data: {
          token: token,
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: found.email,
          type: type,
          isAdmin: isAdmin
        }
      });
    }
  }]);

  return UserController;
}();

exports["default"] = UserController;