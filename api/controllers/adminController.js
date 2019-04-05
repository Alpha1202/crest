import Admin from '../models/Admin';
import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
// import { config } from 'dotenv';
import bcrypt from 'bcrypt';



const staff = new Admin();
export default class AdminController {
    /**
     * Create a new Admin
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created admin object
     */
    static signup(req, res) {
        const newAdmin = staff.findAllAdmin();
        const found = newAdmin.some(anAdmin => anAdmin.email === req.body.email)
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
            const Admin = staff.create({ email, firstName, lastName, password: hash });
            const newAdmin = {
                email: Admin.email,
                firstName: Admin.firstName,
                lastName: Admin.lastName,
                password: Admin.password,
            };
            jwt.sign({ user: newAdmin }, 'secretkey', {expiresIn: "7d"}, (err, token) => {
                return res.status(201).json({ 
                    data: {
                        token,
                        id: Admin.id,
                        email: Admin.email,
                        firstName: Admin.firstName,
                        lastName: Admin.lastName,
                        password: Admin.password,
                        type: "staff",
                        isAdmin: true
                    }
                });
            });
           
        }
        
    }

/**
 * Log in an admmin
 * @param {object} req
 * @param {object} res
 * @return {json} admin logged in
 */
static login(req, res) {
    
    const newAdmin = staff.findAllAdmin();
    const found = newAdmin.find(anAdmin => anAdmin.email === req.body.email)
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
        
    const verifiedAdmin = {
        id: found.id,
        email: found.email,
        firstName: found.firstName,
        lastName: found.lastName,
        password: found.password,
    };
    
    const token= jwt.sign({verifiedAdmin}, 'secretkey', {expiresIn: "7d"}); 
        return res.status(200).json({ 
            message: 'Login successful',
            data: {
                token,
               verifiedAdmin
            }
        });

}
}

