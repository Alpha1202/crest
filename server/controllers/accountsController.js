import { config } from 'dotenv';
import moment from 'moment';
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
    const { accountNumber, owner, type, status, balance } = req.body;
    const data = `INSERT INTO
    accounts(
      accountNumber, 
      createdOn,
      owner,
      type,
      status,
      balance
      )
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;

    const values = [
      accountNumber,
      moment(new Date()),
      owner,
      type,
      status,
      balance,
    ];

    try {
      const { rows } = await db.query(data, values);
      console.log(rows);
      
      return res.status(201).json({ status: 201,
        data: {
          accountNumber: rows[0].accountnumber,
          owner: rows[0].owner,
          type: rows[0].type,
          openingBalance: rows[0].balance,
        },
      })
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  


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
        return res.status(404).send({message: 'account not found'})
      }
      const values = [
        status || rows[0].status,
        accountNumber,
      ];

      const result = await db.query(updateOne, values);
      return res.status(200).json({ status: 200, data:
        result.rows[0]});
    } catch (error) {
      return res.status(400).send(error);
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
        return res.status(404).json({ status: 204, message: 'account not found'})
      }
      return res.status(204).json({ status: 204, message: 'account deleted'});
    } catch (error) {
      return res.status(400).json({status: 204, error });
    }
  }
}