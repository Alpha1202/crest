/* eslint-disable consistent-return */


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
    if (!type || type === 'undefined' || type === '') {
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
    const { openingBalance } = req.body;
    if (!openingBalance || openingBalance === 'undefined' || openingBalance === '') {
      return res.status(400).json({ status: 400, error: 'please specify your opening Balance' });
    }
    const numericRegExp = /^[0-9]+$/;
    if (!openingBalance.match(numericRegExp)) {
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

  static validateAccountNumber(req, res, next) {
    const { accountNumber } = req.params;
    const numericRegExp = /^[0-9]+$/;
    if (!accountNumber.match(numericRegExp)) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid account Number' });
    }
    next();
  }
}
