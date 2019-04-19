import express from 'express';
import transaction from '../controllers/transactionsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';
import TransactionHelper from '../Helpers/transactionHelper';

const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit',
  // Auth.checkToken,
  // validate.validateAccountNumber,
  TransactionHelper.debitAccount,
  transaction.debit);


transactionRouter.post('/:accountNumber/credit',
//   Auth.checkToken,
//   validate.validateAccountNumber,
  TransactionHelper.creditAccount,
  transaction.credit);

export default transactionRouter;
