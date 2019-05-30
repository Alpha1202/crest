import { config } from 'dotenv';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../db/index';

config();

/**
 *@class account controller
 */
export default class AccountsController {
  /**
   * Create a new account
   * @param {object} req
   * @param {object} res
   * @return {object} created account
   */

  static async createAccount(req, res) {
    const accountNumberPrefix = '00';
    const generateAccountNumber = Date.now();
    const newAccountNumber = accountNumberPrefix + generateAccountNumber;
    
    const { type } = req.body;
    const authData = jwt.verify(req.token, process.env.JWT_SECRET);
    const { firstName, lastName, email } = authData;

    
    const data = `INSERT INTO
    accounts(
      accountNumber, 
      createdOn,
      owneremail,
      type,
      status,
      balance
      )
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      newAccountNumber,
      moment(new Date()),
      email,
      type.toLowerCase(),
      'dormant',
      0,
    ];
    const { rows } = await db.query(data, values);
   
    res.status(201).json({ 
      status: 201,
      data: {
        accountNumber: rows[0].accountnumber,
        firstName,
        lastName,
        email,
        type: rows[0].type,
        openingBalance: rows[0].balance,
      },
    });
  };

  /**
   * Activate or Deactivate an account
   * @param {object} req
   * @param {object} res
   * @return {object} PATCHed account
   */
  static async updateAccountStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    
    const findOne = 'SELECT * FROM accounts WHERE accountNumber = $1';
    const updateOne = `UPDATE accounts
    SET status = $1
    WHERE accountNumber = $2 returning *`;
    try {
      const { rows } = await db.query(findOne, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'account not found' });
      }
      const values = [
        status.toLowerCase() || rows[0].status,
        accountNumber,
      ];

      const result = await db.query(updateOne, values);
      return res.status(200).json({ status: 200,
        data: result.rows[0] });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  /**
   * Delete an account
   * @param {object} req
   * @param {object} res
   * @return {object} all accounts except the deleted account
   */
  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const deleteQuery = 'DELETE FROM accounts WHERE accountNumber=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, message: 'account not found' });
      }
      return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
   * 
   */
  static async getAccountTransactionsHistory(req, res) {
    const { accountNumber } = req.params;
    const findTransactionsHistory = 'SELECT * FROM transactions WHERE accountnumber = $1';
    try {
      const { rows } = await db.query(findTransactionsHistory, [accountNumber]);

      jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        
        
        const { type, email } = authData;
        if (type === 'client') {
          const checkAccount = 'SELECT * FROM accounts WHERE owneremail = $1';
          const accounts = await db.query(checkAccount, [email.toLowerCase()]);
          
          if (accounts.rows.length === 0) {
            return res.status(403).json({ status: 403, error: 'You do not have access to this account' })
          }  
          const userTransactions = rows.filter(transactions => transactions.accountnumber === accountNumber);
          return res.status(200).json({ status: 200, data: userTransactions });
        }
        return res.status(200).json({ status: 200, data: rows });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }

  /**
   * 
   */
  static async getOneAccount(req, res) {
    const { accountNumber } = req.params;
    const findOneAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';

    try {
      const { rows } = await db.query(findOneAccount, [accountNumber]);
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
  /**
   * 
   */

  static async getAllAccount(req, res) {
    const { status } = req.query;

    const findAllAccount = 'SELECT * FROM accounts';
    try {
      const { rows } = await db.query(findAllAccount);
      jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
        const { type, email } = authData;
        if (type === 'client') {
          const checkAccount = 'SELECT * FROM accounts WHERE owneremail = $1';
          const allaccounts = await db.query(checkAccount, [email.toLowerCase()]);
          
          if (allaccounts.rows.length === 0) {
            return res.status(403).json({ status: 403, error: 'You do not have any account yet' })
          } 
          const userAccount = rows.filter(accounts => accounts.owneremail === email);
          return res.status(200).json({ status: 200, data: userAccount });
        } if (!status) {
          return res.status(200).json({ status: 200, data: rows });
        } 
        if (status === 'active') {
          const activeAccounts = rows.filter(someAccounts => someAccounts.status === 'active');
          return res.status(200).json({ status: 200, data: activeAccounts });
        }
        if (status === 'dormant') {
          const dormantAccounts = rows.filter(someAccounts => someAccounts.status === 'dormant');
          return res.status(200).json({ status: 200, data: dormantAccounts });
        }
        return res.status(400).json({ status: 400, message: 'Please specify active or dormant'});
        
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
}
