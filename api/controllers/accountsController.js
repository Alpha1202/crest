import Account from '../models/Accounts';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';




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
      /**
   * Activate or Deactivate an account
   * @param {object} req
   * @param {object} res
   * @return {object} PATCHed account
   */
  static patchAcc(req, res) {
      const { accountNumber } = req.params;
      const Account =  acc.findAccount(accountNumber);
     
      if(!Account) {
        return res.status(404).json({error: 'No account with that account number'});
      } 
      const { id,  ownerId, type, status, openingBalance, createdOn } = Account;
      if(Account.status === 'active') {
         Account.status = 'dormant';
         return res.status(200).json({
           status:200,
           data: {
             accountNumber,
            status,
             id,
             ownerId,
             type,
             openingBalance,
             createdOn
           }})
      }
      if(Account.status === 'dormant') {
        Account.status = 'active';
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber,
            status,
             id,
             ownerId,
             type,
             openingBalance,
             createdOn
          }})
        }   
  }

    /**
   * Delete an account
   * @param {object} req
   * @param {object} res
   * @return {object} all accounts except the deleted account
   */
  static AccDelete(req, res) {
    const { accountNumber } = req.params;
     const found = acc.findAccount(accountNumber)
     if(!found) {
       return res.status(404).json({error: 'No account with that account number'});
     } 
     const deleted =  acc.deleteAcc(found);
     return res.status(200).json({
       status: 200,
       message: 'Account successfully deleted'
     });
 }
 }
    
  
