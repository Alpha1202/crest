/* eslint-disable consistent-return */
import { config } from 'dotenv';
import db from '../db/index';

config();


/**
     *@class validate
  */
export default class validate {
/**
     * validates inputs for creating account
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created account object
     */
  static validateType(req, res, next) {
    const { type } = req.body;
    if (!type) {
      return res.status(400).json({ status: 400, error: 'please enter account type, savings or current' });
    }
    const alphaRegExp = /^[a-zA-Z]+$/;
    if (!type.match(alphaRegExp)) {
      return res.status(400).json({ status: 400, error: 'Only alphabets are allowed, white spaces are not allowed' });
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateOpeningBalance(req, res, next) {
    const { balance } = req.body;
    if (!balance || balance === 'undefined' || balance === '') {
      return res.status(400).json({ status: 400, error: 'please specify your opening Balance' });
    }
    const numericRegExp = /^[0-9]+$/;
    if (!balance.match(numericRegExp)) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid amount' });
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateStatus(req, res, next) {
    const { status } = req.body;
    if (!status || status === 'undefined' || status === '') {
      return res.status(400).json({ status: 400, error: 'please specify the account status, please specify dormant or active' });
    }
    const alphaRegExp = /^[a-zA-Z]+$/;
    if (!status.match(alphaRegExp)) {
      return res.status(400).json({ status: 400, error: 'Invalid account status, please specify dormant or active' });
    }
    next();
  }

  /**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static validateAccountNumber(req, res, next) {
    const { accountNumber } = req.params;
    const numericRegExp = /^[0-9]+$/;
    if (!accountNumber.match(numericRegExp)) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid account Number' });
    }
    next();
  }

  /**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  static async checkAccountNumber(req, res, next) {
    const { accountNumber } = req.params;
    const findAccountNumber = 'SELECT * FROM accounts WHERE accountnumber = $1';
    const { rows } = await db.query(findAccountNumber, [accountNumber]);   
    if (rows[0] === undefined) {
      return res.status(404).json({ status: 404, error: 'Cannot find your account number' });
    }
    next();
  }
}
