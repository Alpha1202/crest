import express from 'express';
import user from '../controllers/usersController';
import validate from '../middleware/userMiddlerware';
import Auth from '../middleware/auth';

const usersAccountRouter = express.Router();

usersAccountRouter.post('/',
  Auth.checkToken,
  validate.validateEmail,
  validate.validateFirstName,
  validate.validateLastName,
  validate.validatePassword,
  validate.validateType,
  Auth.allowAdminOnly,
  user.createUser);

usersAccountRouter.post('/signin',
  validate.validateEmail,
  validate.validatePassword,
  validate.verifyUser,
  user.signin);

usersAccountRouter.put('/:email',
  Auth.checkToken,
  validate.validateType,
  Auth.allowAdminOnly,
  user.updateUser);

usersAccountRouter.get('/:email/accounts',
  Auth.checkToken,
  validate.validateEmailParam,
  validate.checkEmail,
  user.getUserAccountList);

export default usersAccountRouter;
