import express from 'express';
import transaction from '../controllers/transactionsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';
import validateTransactions from '../middleware/transactionMiddleware';

const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit',
  Auth.checkToken,
  validate.validateAccountNumber,
  validateTransactions.validateAmount,
  transaction.debit);


transactionRouter.post('/:accountNumber/credit',
  Auth.checkToken,
  validate.validateAccountNumber,
  transaction.credit);

export default transactionRouter;
