import express from 'express';
import account from '../controllers/accountsController';
import Auth from '../middleware/auth';
import validate from '../middleware/accountMiddleware';


const accountsRouter = express.Router();

accountsRouter.post('/',
  Auth.checkToken,
  Auth.allowUserOnly,
  validate.validateType,
  account.createAccount);

accountsRouter.patch('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  validate.validateStatus,
  Auth.allowStaffOnly,
  validate.checkAccountNumber,
  account.updateAccountStatus);


accountsRouter.delete('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  Auth.allowAdminOnly,
  validate.checkAccountNumber,
  account.deleteAccount);

accountsRouter.get('/:accountNumber/transactions',
  Auth.checkToken,
  validate.validateAccountNumber,
  validate.checkAccountNumber,
  account.getAccountTransactionsHistory);

accountsRouter.get('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  validate.checkAccountNumber,
  Auth.allowStaffOnly,
  account.getOneAccount);

accountsRouter.get('/',
  Auth.checkToken,
  Auth.allowAdminOrUser,
  account.getAllAccount);


export default accountsRouter;
