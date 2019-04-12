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

var User =
/*#__PURE__*/
function () {
  /**
     * class constructor
     * @param {object} user
     */
  function User() {
    _classCallCheck(this, User);

    this.users = [{
      id: 1,
      email: 'nzubennamani@gmail.com',
      firstName: 'Nzubechukwu',
      lastName: 'Nnamani',
      password: '123456',
      type: 'client',
      isAdmin: false
    }, {
      id: 20,
      email: 'nnamani@gmail.com',
      firstName: 'Nzubechukwu',
      lastName: 'Nnamani',
      password: '654321',
      type: 'staff',
      isAdmin: true
    }, {
      id: 43,
      email: 'zuby@gmail.com',
      firstName: 'Nzubechukwu',
      lastName: 'Nnamani',
      password: '213456',
      type: 'client',
      isAdmin: false
    }, {
      id: 20,
      email: 'alpha@gmail.com',
      firstName: 'Nzubechukwu',
      lastName: 'Nnamani',
      password: '543216',
      type: 'staff',
      isAdmin: true
    }];
  }
  /**
     * @param {object} new user object
     * @returns {object} user object
     */


  _createClass(User, [{
    key: "create",
    value: function create(user) {
      var newUser = {
        id: _uuid["default"].v4(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        type: user.type,
        isAdmin: user.isAdmin
      };
      var saveUser = this.users.push(newUser);

      if (saveUser) {
        return {
          newUser: newUser,
          saved: true
        };
      }

      return {
        saved: false
      };
    }
    /**
       * @param {uuid} id
       * @returns {object} user object
       */

  }, {
    key: "findAuser",
    value: function findAuser(email) {
      return this.users.find(function (user) {
        return user.email === email;
      });
    }
    /**
       * @returns {object} returns all the users
       */

  }, {
    key: "findAllUser",
    value: function findAllUser() {
      return this.users;
    }
  }]);

  return User;
}();

exports["default"] = User;