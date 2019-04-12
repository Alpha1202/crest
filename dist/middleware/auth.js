"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
     *@class Auth
  */
var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "checkToken",

    /**
       * create a new token
       * @param {object} req request object
       * @param {object} returns an object
       */
    value: function checkToken(req, res, next) {
      try {
        // eslint-disable-next-line dot-notation
        var token = req.headers['authorization'];

        if (typeof token !== 'undefined') {
          var bearer = token.split(' ');
          var bearerToken = bearer[1];
          req.token = bearerToken;
          next();
        } else {
          res.status(403).json({
            status: 403,
            error: 'You are not authorised'
          });
        }
      } catch (error) {
        res.status(400).json({
          status: 400,
          error: 'Access token not valid'
        });
      }
    }
  }]);

  return Auth;
}();

exports["default"] = Auth;