/* eslint-disable consistent-return */
import { config } from 'dotenv';
import db from '../db/index';
import { type } from 'os';

config();

/**
     *@class validate
  */
export default class validate {
  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateEmail(req, res, next) {
    const { email } = req.body;
    if (!email || email === 'undefined' || email === '') {
      return res.status(400).json({ status: 400, error: 'Please enter your email' });
    }
    const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(emailExp.test(email))) {
      return res.status(400).json({ status: 400, error: 'Invalid Email' });
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateFirstName(req, res, next) {
    const { firstName } = req.body;
    if (!firstName || firstName === 'undefined' || firstName === '') {
      return res.status(400).json({ status: 400, error: 'Please enter your First Name' });
    }
    const alphaRegExp = /^[a-zA-Z]+$/;
    if (!firstName.match(alphaRegExp)) {
      return res.status(400).json({ status: 400, error: 'Only alphabets are allowed, white spaces are not allowed' });
    }
    if (firstName.length <= 2) {
      return res.status(400).json({ status: 400, error: 'First Name should be atleast 3 letters' });
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateLastName(req, res, next) {
    const { lastName } = req.body;
    if (!lastName || lastName === 'undefined' || lastName === '') {
      return res.status(400).json({ status: 400, error: 'Please enter your Last Name' });
    }
    const alphaRegExp = /^[a-zA-Z]+$/;
    if (!lastName.match(alphaRegExp)) {
      return res.status(400).json({ status: 400, error: 'Only alphabets are allowed' });
    }
    if (lastName.length <= 2) {
      return res.status(400).json({ status: 400, error: 'Last Name should be atleast 3 letters' });
    }
    next();
  }

  /**
     * validates inputs for creating or logging a user
     * @params {object} req
     * @params {object} res
     * @returns {object} a user object
     */
  static validatePassword(req, res, next) {
    const { password } = req.body;
    if (!password || password === 'undefined' || password === '') {
      return res.status(400).json({ status: 400, error: 'Please enter your password' });
    }
    if (!password.length >= 7 && password.length <= 15) {
      return res.status(400).json({ status: 400, error: 'Password should be atleast 7 characters' });
    }
    next();
  }

  /**
     * validates inputs for signin in a user
     * @params {object} req
     * @params {object} res
     * @returns {object} signed in user object
     */
  static async verifyUser(req, res, next) {
    const { email } = req.body;
    const findOne = 'SELECT * FROM users WHERE email = $1';

    const { rows } = await db.query(findOne, [email]);
    if (!rows[0]) {
      return res.status(404).json({ status: 404, error: 'Email does not exist'});
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
  static validateEmailParam(req, res, next) {
    const { email } = req.params;
    if (!email || email === 'undefined' || email === '') {
      return res.status(400).json({ status: 400, error: 'Please enter your email' });
    }
    const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailExp)) {
      return res.status(400).json({ status: 400, error: 'Invalid Email' });
    }
    next();
  }

  /**
     * validates inputs for creating a new user
     * @params {object} req
     * @params {object} res
     * @returns {object} a newly created user object
     */
    static async checkEmail(req, res, next) {
      const { email } = req.params;
      const findOne = 'SELECT * FROM users WHERE email = $1';

      const { rows } = await db.query(findOne, [email]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'Email does not exist'});
      }
      next();
    }
}
