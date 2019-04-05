import Account from '../models/Accounts';
import jwt from 'jsonwebtoken';
import { validationResult } from 'Express-validator/check';
// import { body } from 'express-validator/check';



const acc = new Account();

export default class AccountsController {
     /**
   * Create a new account
   * @param {object} req
   * @param {object} res
   * @return {object} created accounts
   */
  static createAccount(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
         return res.status(403).json({error: 'Forbidden'});
      } 
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(422).json({ error: errors.array()[0].msg })
      }
       else { 
        const { type, status, openingBalance } = req.body;

        const account = acc.create({ type, status, openingBalance })
        
        const newAccount =  {
          id: account.id,
          accountNumber: account.accountNumber,
          ownerId: authData,
          type: account.type,
          status: account.status,
          openingBalance: account.openingBalance
        }
        return res.status(201).json({
            message: 'Account created successfully',
            data: authData,
            newAccount
           
        });
      
      }
      }) 
    
    };
}
    
  