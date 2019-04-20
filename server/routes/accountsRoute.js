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
  account.updateAccountStatus);


accountsRouter.delete('/:accountNumber',
  Auth.checkToken,
  validate.validateAccountNumber,
  Auth.allowStaffOnly,
  account.deleteAccount);


export default accountsRouter;
