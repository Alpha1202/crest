import Helper from '../Helpers/helpers';
import db from '../db/index';


/**
 *@class user controller
 */
export default class UserController {
  /**
     * Create a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */

  static async signup(req, res) {
    const { email, firstName, lastName, password } = req.body;
    const type = 'client';
    const isAdmin = false;
    const hash = Helper.hash(password);

    const data = `INSERT INTO
    users( email, firstName, lastName, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      email.toLowerCase(),
      firstName.toLowerCase(),
      lastName.toLowerCase(),
      hash,
      type,
      isAdmin,
    ];
    try {
      const { rows } = await db.query(data, values);
      const { id, firstname, lastname, isadmin } = rows[0];
      const token = Helper.getToken(id, rows[0].email, firstname, lastname, rows[0].type, isadmin );
      res.status(201).json({ status: 201,
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        } });

    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409, error: 'Email already exists' });
      }
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @return {json} user logged in
 */
  static async login(req, res) {
    const { email, password } = req.body;

    const data = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(data, [email.toLowerCase()]);
      if (rows[0].type === 'admin' || rows[0].type === 'staff') {
        return res.status(404).json({ status: 404, error: 'Will you like to be redirected to the Admin\'s login page? '});
      }
      if (!Helper.checkPassword(rows[0].password, password)) {
        return res.status(400).send({ status: 400, error: 'invalid password'});
      }
      const { id, firstname, lastname, isadmin } = rows[0];
      const token = Helper.getToken(id, rows[0].email, firstname, lastname, rows[0].type, isadmin );
      return res.status(200).json({ 
        status: 200,
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
 * Login Admin/staff/cashier
 * @param {object} req
 * @param {object} res
 * @return {json} user logged in
 */
  static async signin(req, res) {
    const { email, password } = req.body;

    const data = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(data, [email.toLowerCase()]);
      if (rows[0].type === 'client') {
        return res.status(404).json({ status: 404, error: 'Will you like to be redirected to the user\'s login page? '});
      }
      
      if (!Helper.checkPassword(rows[0].password, password)) {
        return res.status(400).send({ status: 400, error: 'invalid password'});
      }
      
      const { id, firstname, lastname, isadmin } = rows[0];
      const token = Helper.getToken(id, rows[0].email, firstname, lastname, rows[0].type, isadmin );
      return res.status(200).json({ 
        status: 200,
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
  /**
 * 
 */

  static async getUserAccountList(req, res) {
    const { email } = req.params;

    const findUserAccountList = 'SELECT * FROM accounts WHERE owneremail = $1';
    try {
      const { rows } = await db.query(findUserAccountList, [email.toLowerCase()]);
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
   * 
   */

  static async createUser(req, res) {
    const { email, firstName, lastName, password, type } = req.body;
    const hash = Helper.hash(password);
    let isAdmin = false;
    if (type.toLowerCase() === 'staff' || type.toLowerCase() === 'admin') {
      isAdmin = true;
    }
    const query = `INSERT INTO
    users( email, firstName, lastName, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      email.toLowerCase(),
      firstName.toLowerCase(),
      lastName.toLowerCase(),
      hash,
      type.toLowerCase(),
      isAdmin,
    ];
    try {
      const { rows } = await db.query(query, values);
      const { id, firstname, lastname, isadmin } = rows[0];
    
      const token = Helper.getToken(id, rows[0].email, firstname, lastname, rows[0].type, isadmin );
      res.status(201).json({ status: 201,
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          Admin: isadmin,
        } });

    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409, message: 'Email already exists' });
      }
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
 * 
 * @param {*} req 
 * @param {*} res 
 */
  static async updateUser(req, res) {
    const { email } = req.params;
    const { type } = req.body;
    let isAdmin = false;
    if (type.toLowerCase() === 'staff' || type.toLowerCase() === 'admin') {
      isAdmin = true;
    }
    const findOne = 'SELECT * FROM users WHERE email = $1';
    const updateOne = `UPDATE users
    SET type = $1, isadmin = $2
    WHERE email = $3 returning *`;

    try {
      const { rows } = await db.query(findOne, [email.toLowerCase()]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'user not found' });
      }
      if (rows[0].type === type.toLowerCase()) {
        return res.status(400).json({ status: 400, error: `user is already updated to ${type.toLowerCase()}`});
      }  
      
      const values = [
        type.toLowerCase(),
        isAdmin,
        email.toLowerCase(),
      ];
      const result = await db.query(updateOne, values);
      const { id, firstname, lastname } = result.rows[0];
      return res.status(200).json({ status: 200,
        data: {
          id,
          email: result.rows[0].email,
          firstname,
          lastname,
          type: result.rows[0].type,
          isAdmin: result.rows[0].isadmin,
        }
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
}
