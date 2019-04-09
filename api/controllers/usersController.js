import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';


const user = new User();
/**
 *
 */
export default class UserController {
  /**
     * Create a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */

  static signup(req, res) {
    const someUser = user.findAllUser();
    const { email, firstName, lastName, password } = req.body;
    const found = someUser.find(aUser => aUser.email === email);
    if (found) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const isAdmin = req.body.isAdmin || false;

    let type;
    isAdmin ? type = 'staff' : type = 'client';

    const hash = bcrypt.hashSync(password, 10);
    const saveUser = user.create({ email, firstName, lastName, password: hash, isAdmin, type });

    if (saveUser.saved) {
      const token = jwt.sign({ id: user.id, email, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '7d'});
      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: saveUser.newUser.id,
          firstName: saveUser.newUser.firstName,
          lastName: saveUser.newUser.lastName,
          email: saveUser.newUser.email.toLowerCase().trim().toString(),
          type,
          isAdmin,
        },
      });
    }
    return res.status(400).json({ error: 'Registration failed, ttry again' });
  }


  /**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @return {json} user logged in
 */
  static login(req, res) {
    const someUser = user.findAllUser();
    const { email } = req.body;
    const found = someUser.find(aUser => aUser.email === email);
    const { id, firstName, lastName, type, isAdmin } = found;
    const token = jwt.sign({ id, email, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({
      status: 200,
      data: {
        token,
        id,
        firstName,
        lastName,
        email: found.email,
        type,
        isAdmin,
      },
    });
  }
}
