import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();


/**
     *@class Auth
  */
export default class Auth {
  /**
     * create a new token
     * @param {object} req request object
     * @param {object} returns an object
     */
  static checkToken(req, res, next) {
    try {
      // eslint-disable-next-line dot-notation
      const token = req.headers['authorization'];
      if (typeof token !== 'undefined') {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
      } else {
        res.status(403).json({status: 403, error: 'You are not authorised' });
      }
    } catch (error) {
      res.status(500).json({status: 500, error: 'Access token not valid' });
    }
  }

  /**
 * checks the type of user
 */
  static allowUserOnly(req, res, next) {

    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      console.log(authData);
      const { type } = authData;
      if (type === 'Admin' || type === 'Staff') {
        return res.status(403).json({ status: 403, error: 'Admin is not authorized' });
      }
      next();
    });
    
    


  }
}
// const {id, email, firstName, lastName, type, isAdmin } = authData;