import express from 'express';
import transaction from '../controllers/transactionsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';


const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit',
  Auth.checkToken,
  validate.validateAccountNumber,
  transaction.debit);


transactionRouter.post('/:accountNumber/credit',
  Auth.checkToken,
  validate.validateAccountNumber,
  transaction.credit);

export default transactionRouter;
