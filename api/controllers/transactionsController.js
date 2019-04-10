import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Transaction from '../models/Transactions';
import Account from '../models/Accounts';


dotenv.config();

const transaction = new Transaction();
const account = new Account();

export default class TransactionController {
  /** POST a debit transaction
     * @param {object} req
     * @param {object} res
    */

  static debit(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({status: 403, error: 'Forbidden' });
      }

      const { id, isAdmin } = authData;
      if (isAdmin === false) {
        return res.status(403).json({ status: 403, error: 'Only Admin is authorized'});
      }

      const { accountNumber } = req.params;
      const checkAccountNumber = account.findAccount(accountNumber);
      if (!checkAccountNumber) {
        return res.status(404).json({status: 404, error: 'Account Number does not exist' });
      }


      const { status, openingBalance } = checkAccountNumber;
      if (status === 'dormant') {
        return res.status(400).json({status: 400, error: 'This account is dormant, please activate' });
      }
      const { amount } = req.body;
      if (!amount || amount === 'undefined') {
        return res.status(400).json({status: 400, error: 'Please specify an amount' });
      }
      const oldBalance = openingBalance;
      if (oldBalance <= 0 && oldBalance < amount) {
        return res.status(400).json({status: 400, error: 'You have insufficient balance' });
      }

      const accountBalance = oldBalance - amount;
      checkAccountNumber.openingBalance = accountBalance;

      const debitTransaction = transaction.debit(amount);
      if (debitTransaction.saved) {
        return res.status(200).json({
          status: 200,
          data: {
            transactionId: uuid.v4(),
            accountNumber,
            amount,
            cashier: id,
            transactionType: 'debit',
            accountBalance,
          },
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Debit transaction failed',
      });
    });
  }

  static credit(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      const { id, isAdmin } = authData;
      if (isAdmin === false) {
        return res.status(403).json({error: 'Only Admin is authorized'});
      }
  
      const { accountNumber } = req.params;

      const checkAccountNumber = account.findAccount(accountNumber);
      if (!checkAccountNumber) {
        return res.status(404).json({ error: 'Account Number does not exist' });
      }

      const { status, openingBalance } = checkAccountNumber;
      if (status === 'dormant') {
        return res.status(400).json({ error: 'This account is dormant, please activate' });
      }
    
      const { amount } = req.body;
      if (!amount || amount === 'undefined') {
        return res.status(400).json({ error: 'Please specify an amount' });
      }
      const oldBalance = openingBalance;

      const accountBalance = parseFloat(oldBalance) + parseFloat(amount);

      checkAccountNumber.openingBalance = accountBalance;

      const creditTransaction = transaction.credit(amount);
      if (creditTransaction.saved) {
        return res.status(200).json({
          status: 200,
          data: {
            transactionId: uuid.v4(),
            accountNumber,
            amount,
            cashier: id,
            transactionType: 'Credit',
            accountBalance: parseFloat(accountBalance),
          },
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Credit transaction failed',
      });
    });
  }
}
