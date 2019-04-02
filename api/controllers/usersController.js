import User from '../models/User';
import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
// import { config } from 'dotenv';
import bcrypt from 'bcrypt';



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
            const { email, firstName, lastName, password } = req.body;
            const hash = bcrypt.hashSync(password, 10);
            const User = client.create({ email, firstName, lastName, password: hash });
            const newUser = {
                email: User.email,
                firstName: User.firstName,
                lastName: User.lastName,
                password: User.password,
            };
            jwt.sign({ user: newUser }, 'secretkey', {expiresIn: "7d"}, (err, token) => {
                return res.status(201).json({ 
                    data: {
                        token,
                        id: User.id,
                        email: User.email,
                        firstName: User.firstName,
                        lastName: User.lastName,
                        password: User.password,
                        type: "client",
                        isAdmin: false
                    }
                });
            });
           
        }
        
    }

/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @return {json} user logged in
 */
static login(req, res) {
    
    const newUser = client.findAllUser();
    const found = newUser.some(auser => auser.email === req.body.email)
    if(!found) {
        return res.status(400).json({ error: 'Email does not exist'});
      }
      const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg })
        }
        //  {
            // const someUser = client.findAuser(req.body.email)
            // const { password } = req.body;
            // bcrypt.compareSync(password, someUser.password);
            // const User = client.create({ email, firstName, lastName, password: hash });
            // const newUser = {
            //     email: User.email,
            //     firstName: User.firstName,
            //     lastName: User.lastName,
            //     password: User.password,
        
    const verifiedUser = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
    };
    const token= jwt.sign({ user: verifiedUser }, 'secretkey', {expiresIn: "7d"}); 
        return res.status(200).json({ 
            message: 'Login successful',
            data: {
                token,
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: newUser.password,
                type: "client",
                isAdmin: false
            }
        });

}
}

