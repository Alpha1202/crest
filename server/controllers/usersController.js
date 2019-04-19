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
    const { email, firstName, lastName, password, type, isAdmin } = req.body;

    const hash = Helper.hash(password);

    const data = `INSERT INTO
    users( email, firstName, lastName, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      email,
      firstName,
      lastName,
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
        return res.status(400).json({ status: 400, message: 'Email already exists' });
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
      const { rows } = await db.query(data, [email]);
    
      if (!Helper.checkPassword(rows[0].password, password)) {
        return res.status(400).send({ message: 'invalid password'});
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

}
