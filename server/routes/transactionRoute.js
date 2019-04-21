import express from 'express';
import transaction from '../controllers/transactionsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';
import TransactionHelper from '../Helpers/transactionHelper';
import validateTransactions from '../middleware/transactionMiddleware';

const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit',
  Auth.checkToken,
  validate.validateAccountNumber,
  Auth.allowStaffOnly,
  validate.checkAccountNumber,
  TransactionHelper.checkAccountStatus,
  TransactionHelper.debitAccount,
  transaction.debit);


transactionRouter.post('/:accountNumber/credit',
  Auth.checkToken,
  validate.validateAccountNumber,
  Auth.allowStaffOnly,
  validate.checkAccountNumber,
  TransactionHelper.checkAccountStatus,
  validateTransactions.validateAmount,
  TransactionHelper.creditAccount,
  transaction.credit);

transactionRouter.get('/:transactionId',
  Auth.checkToken,
  validateTransactions.checkTransactionId,
  transaction.getAtransaction);


export default transactionRouter;
