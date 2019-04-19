import { config } from 'dotenv';
import db from '../db/index';

config();

export default class TransactionHelper {
  /**
   * verify account number and account balance for a debit transaction
   * and update the account
   */

  static async debitAccount(req, res, next) {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    const findOne = 'SELECT * FROM accounts WHERE accountNumber = $1';
    const debit = `UPDATE accounts
      SET balance =$1
      WHERE accountNumber = $2 returning *`;
    try {
      const { rows } = await db.query(findOne, [accountNumber]);
      // console.log(rows[0]);
      
      if (!rows[0]) {
        return res.status(404).json({ status: 404, message: 'Account Not found'});
      }

      const oldBalance = rows[0].balance;
      const balance = oldBalance - parseInt(amount, 10);
     
      const values = [
        balance,
        accountNumber,
      ];
  
      await db.query(debit, values);
     
    } catch (error) {
      res.status(500).json({ status: 500, error })

    }    
    next(); 
  }

  /**
   * verify account number and account balance for a credit transaction
   * and update the account
   */

  static async creditAccount(req, res, next) {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    const findOne = 'SELECT * FROM accounts WHERE accountNumber = $1';
    const debit = `UPDATE accounts
      SET balance =$1
      WHERE accountNumber = $2 returning *`;
    try {
      const { rows } = await db.query(findOne, [accountNumber]);
      
      if (!rows[0]) {
        return res.status(404).json({ status: 404, message: 'Account Not found'});
      }

      const oldBalance = rows[0].balance;
      const balance = oldBalance + parseInt(amount, 10);
     
      const values = [
        balance,
        accountNumber,
      ];
  
      await db.query(debit, values);
     
    } catch (error) {
      res.status(500).json({ status: 500, error })

    }    
    next(); 
  }
}
