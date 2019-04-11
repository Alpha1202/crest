import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Account from '../models/Accounts';

dotenv.config();

const account = new Account();

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
  static createAccount(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      const { firstName, lastName, email, isAdmin } = authData;
      if (isAdmin === true) {
        return res.status(403).json({ status: 403, error: 'Admin is not authorized' });
      }
      const { type } = req.body;

      const saveAccount = account.create({ type });

      if (saveAccount.saved) {
        return res.status(201).json({
          status: 201,
          data: {
            id: saveAccount.newAccount.id,
            accountNumber: saveAccount.newAccount.accountNumber,
            firstName,
            lastName,
            email,
            type: saveAccount.newAccount.type,
            status: saveAccount.newAccount.status,
            openingBalance: saveAccount.newAccount.openingBalance,
          },
        });
      }
      return res.status(400).json({ status: 400, error: 'Account not created successfully' });
    });
  }

  /**
   * Activate or Deactivate an account
   * @param {object} req
   * @param {object} res
   * @return {object} PATCHed account
   */
  static updateAccountStatus(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      const { isAdmin } = authData;
      if (isAdmin === false) {
        return res.status(403).json({ status: 403, error: 'Only Admin is authorized' });
      }
      const { accountNumber } = req.params;
      const found = account.findAccount(accountNumber);
      if (!found) {
        return res.status(404).json({ status: 404, error: `Account Number ${accountNumber} does not exist` });
      }
      const { id, ownerId, type, status, openingBalance, createdOn } = found;
      if (found.status === 'active') {
        found.status = 'dormant';
        account.save(found);
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber,
            status,
            id,
            ownerId,
            type,
            openingBalance,
            createdOn,
          },
        });
      }
      if (found.status === 'dormant') {
        found.status = 'active';
        account.save(found);
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber,
            status,
            id,
            ownerId,
            type,
            openingBalance,
            createdOn,
          },
        });
      }
    });
  }


  /**
   * Delete an account
   * @param {object} req
   * @param {object} res
   * @return {object} all accounts except the deleted account
   */
  static deleteAccount(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      const { isAdmin } = authData;
      if (isAdmin === false) {
        return res.status(403).json({ status: 403, error: 'Only Admin is authorized' });
      }
      const { accountNumber } = req.params;
      const found = account.findAccount(accountNumber);
      if (!found) {
        return res.status(404).json({ status: 404, error: 'No account with that account number' });
      }
      account.deleteAccount(found);
      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    });
  }
}
