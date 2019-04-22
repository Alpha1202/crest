import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../db/index';

config();

export default class TransactionController {
  /** POST a debit transaction
     * @param {object} req
     * @param {object} res
    */

  static async debit(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const convertedAmount = parseFloat(amount);
    const authData = jwt.verify(req.token, process.env.JWT_SECRET);
    const { id } = authData;

    const updatedAccount = 'SELECT * FROM accounts WHERE accountNumber = $1';

    const result = await db.query(updatedAccount, [accountNumber]);
    const { accountnumber, createdon, balance } = result.rows[0];
    const oldBalance = parseFloat(balance) + parseFloat(amount);
    const newTransaction = `INSERT INTO
    transactions(
      createdon,
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const values = [
      createdon,
      'debit',
      accountnumber,
      id,
      convertedAmount,
      oldBalance,
      balance,
    ];
    try {
      const { rows } = await db.query(newTransaction, values);
      return res.status(200).json({ status: 200,
        data: rows[0]
        
      });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }


  /**
   * 
   */

  static async credit(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;
    const convertedAmount = parseFloat(amount);
    const authData = jwt.verify(req.token, process.env.JWT_SECRET);
    const { id } = authData;


    const updatedAccount = 'SELECT * FROM accounts WHERE accountNumber = $1';

    const result = await db.query(updatedAccount, [accountNumber]);
    const { accountnumber, createdon, balance } = result.rows[0];
    const oldBalance = parseFloat(balance) - parseFloat(amount);
    
    const newTransaction = `INSERT INTO
    transactions(
      createdon,
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const values = [
      createdon,
      'credit',
      accountnumber,
      id,
      convertedAmount,
      oldBalance,
      balance,
    ];
    try {
      const { rows } = await db.query(newTransaction, values);
      return res.status(200).json({ status: 200,
        data: rows[0]
      });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }


  /**
   * 
   */

  static async getAtransaction(req, res) {
    const { transactionId } = req.params;

    const findAtransaction = 'SELECT * FROM transactions WHERE id = $1';

    try {
      const { rows } = await db.query(findAtransaction, [transactionId]);
      return res.status(200).json({ status: 200, data: rows[0] });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
       
    }
  }
}

