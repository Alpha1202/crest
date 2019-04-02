import User from '../models/User';
// import validate from '../middleware/userMiddlerware';
import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';

const client = new User();
export default class UserController {
    /**
     * Create a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
    static signup(req, res) {
        const newUser = client.findAllUser();
        const found = newUser.some(auser => auser.email === req.body.email)
        if(found) {
          return res.status(400).json({ error: 'Email already exists'})
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg })
        }
         else {
            const user = client.create(req.body)
            jwt.sign({user}, 'secretkey', {expiresIn: "7d"}, (err, token) => {
                return res.status(201).json({ 
                    data: {
                        id: user.id,
                        token,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: user.password,
                        type: "client",
                        isAdmin: false
                    }
                });
            });
           
        }
        
    }
}

