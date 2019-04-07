import express from 'express';
import AccountsController from '../controllers/accountsController';
import Auth from '../middleware/auth';
import { validate } from '../middleware/accountMiddleware';

const accountsRouter = express.Router();

accountsRouter.post('/', Auth.verifyToken, validate('createAccount'), AccountsController.createAccount);
accountsRouter.patch('/:accountNumber', Auth.verifyToken, validate('patchAcc'), AccountsController.patchAcc);
accountsRouter.delete('/:accountNumber', Auth.verifyToken, AccountsController.AccDelete);


export default accountsRouter;  