import express from 'express';
import TransactionController from '../controllers/transactionsController';
import Auth from '../middleware/auth';
import { validate } from '../middleware/transactionMiddleware';

const transactionRouter = express.Router();

transactionRouter.post('/:accountNumber/debit', Auth.verifyToken, validate('transaction'), TransactionController.debit);
transactionRouter.post('/:accountNumber/credit', Auth.verifyToken, validate('transaction'), TransactionController.credit);

export default transactionRouter;
