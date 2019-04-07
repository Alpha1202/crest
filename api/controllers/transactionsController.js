import Transaction from '../models/Transactions';
import Account from '../models/Accounts';
import uuid from 'uuid';
import { validationResult } from 'express-validator/check';



const transaction = new Transaction();
const acc = new Account();
export default class TransactionController {
    /**POST a debit transaction
     * @param {object} req
     * @param {object} res
     */

     static debit(req, res) {
         const { accountNumber } = req.params;
        const AccNum = acc.findAllAccounts();
        const checkAccNum = AccNum.find(anAcc => anAcc.accountNumber === accountNumber);
        if(!checkAccNum) {
            return res.status(404).json({error: 'Account Number does not exist'})
        }
       const { status, openingBalance } = checkAccNum;
       if(status === 'dormant') {
          return res.status(400).json({error: 'This account is dormant, please activate'})
       }
       const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(422).json({ error: errors.array()[0].msg })
      }
       const { amount } = req.body;
       if(!amount || amount === 'undefined') {
           return res.status(400).json({error: 'Please specify an amount'});
       }
       const oldBalance = openingBalance;
       if(oldBalance <= 0 && oldBalance < amount) {
           return res.status(400).json({error: 'You have insufficient balance'})
       }
    
       const accountBalance = oldBalance - amount;
       checkAccNum.openingBalance = accountBalance;
    
       return res.status(200).json({
           message: 'Debit successful',
           data: {
               transactionId: uuid.v4(),
               accountNumber,
               amount,
               cashier: 23,
               transactionType: 'debit',
               accountBalance
           }
       })
       
       
     }

     static credit(req, res) {
        const { accountNumber } = req.params;
       const AccNum = acc.findAllAccounts();
       const checkAccNum = AccNum.find(anAcc => anAcc.accountNumber === accountNumber);
       if(!checkAccNum) {
           return res.status(404).json({error: 'Account Number does not exist'})
       }
      const { status, openingBalance } = checkAccNum;
      if(status === 'dormant') {
         return res.status(400).json({error: 'This account is dormant, please activate'})
      }
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(422).json({ error: errors.array()[0].msg })
      }
      const { amount } = req.body;
      if(!amount || amount === 'undefined') {
          return res.status(400).json({error: 'Please specify an amount'});
      }
      const oldBalance = openingBalance;
   
      const accountBalance = parseFloat(oldBalance) + parseFloat(amount);
 
      checkAccNum.openingBalance = accountBalance;
  
      return res.status(200).json({
          message: 'credit successful',
          data: {
              transactionId: uuid.v4(),
              accountNumber,
              amount,
              cashier: 23,
              transactionType: 'Credit',
             accountBalance: parseFloat(accountBalance)
          }
      })
    
    }
}