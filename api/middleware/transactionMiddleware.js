/* eslint-disable consistent-return */


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
    if (!amount.match(numericRegExp)) {
      return res.status(400).json({status: 400, error: 'Please enter a valid amount' });
    }
    next();
  }
}
