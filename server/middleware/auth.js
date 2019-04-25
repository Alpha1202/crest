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
        const Bearer = token.split(' ');
        const bearerToken = Bearer[1];
        req.token = bearerToken;
        next();
      } else {
        res.status(403).json({ status: 403, error: 'You are not authorised' });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: 'Access token not valid' });
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
      const { type } = authData;
      if (type === 'admin' || type === 'staff' || type === 'cashier') {
        return res.status(403).json({ status: 403, error: 'Staff is not authorized' });
      }
      next();
    });
    
  }

  /**
 * checks the staff
 */
  static allowAdminOnly(req, res, next) {

    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      const { type } = authData;
      if (type === 'client' || type === 'cashier' || type !== 'Admin' || type !== 'staff') {
        return res.status(403).json({ status: 403, error: 'Only Admin is authorized' });
      }
      next();
    });
  
  }

  /**
 * checks the staff
 */
  static allowStaffOnly(req, res, next) {

    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      const { type } = authData;
      if (type === 'client' || type !== 'staff' || type !== 'admin' || type !== 'cashier') {
        return res.status(403).json({ status: 403, error: 'Only Staff members are authorized' });
      }
      next();
    });

  }
}
