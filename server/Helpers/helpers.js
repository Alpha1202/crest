import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 *@class help class
 */
export default class Helper {
  /**
       * Create a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */

  static hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
       * Create a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */

  static checkPassword(hash, password) {
    return bcrypt.compareSync(password, hash);
  }
  /**
       * Create a new user
       * @params {object} req
       * @params {object} res
       * @returns {object} a newly created user object
       */

  static getToken(id, email, firstName, lastName, type, isAdmin ) {
    const token = jwt.sign({
      id,
      email,
      firstName,
      lastName,
      type,
      isAdmin,
    },
    process.env.JWT_SECRET, { expiresIn: '7d' }, );
    return token;
  }
}

