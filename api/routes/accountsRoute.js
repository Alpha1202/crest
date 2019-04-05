import express from 'express';
import AccountsController from '../controllers/accountsController';
import Auth from '../middleware/auth';
import { validate } from '../middleware/accountMiddleware';

const accountsRouter = express.Router();

accountsRouter.post('/', Auth.verifyToken, validate('createAccount'), AccountsController.createAccount);
// usersRouter.post('/auth/signin',  validate('signin'), UserController.login);

export default accountsRouter;  