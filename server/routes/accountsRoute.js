import express from 'express';
import account from '../controllers/accountsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';

const accountsRouter = express.Router();

accountsRouter.post('/',
  Auth.checkToken,
  validate.validateType,
  // validate.validateOpeningBalance,
  account.createAccount);

accountsRouter.patch('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  validate.validateStatus,
  account.updateAccountStatus);


accountsRouter.delete('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  account.deleteAccount);


export default accountsRouter;
