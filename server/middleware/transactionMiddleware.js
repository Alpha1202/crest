/* eslint-disable consistent-return */
import { config } from 'dotenv';
import db from '../db/index';

config();

/**
     *@class validate
  */
export default class validateTransactions {
  /**
     * validates inputs for debit/credit transactions
     * @params {object} req
     * @params {object} res
     * @returns {object} a transaction object
     */
  static validateAmount(req, res, next) {
    const { amount } = req.body;
    if (!amount || amount === 'undefined' || amount === '') {
      return res.status(400).json({ status: 400, error: 'please specify an amount' });
    }
    const numericRegExp = /^[0-9]+$/;
    if (numericRegExp.test(amount) === false) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid amount' });
    }
    next();
  }

  /**
   *
   */

  static async checkTransactionId(req, res, next) {
    const { transactionId } = req.params;

    const findOne = 'SELECT * FROM transactions WHERE id = $1';

    try {
      const { rows } = await db.query(findOne, [transactionId]);
      if (rows[0] === undefined) {
        return res.status(400).json({ status: 400, error: 'TransactionId not found'});
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
    next();
  }

   /**
   *
   */

  static async validateTransactionId(req, res, next) {
    const { transactionId } = req.params;
   
    const numericRegExp = /^[0-9]+$/;
    if (numericRegExp.test(transactionId) === false) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid transaction Id' });
    }
    next();
  }
}
