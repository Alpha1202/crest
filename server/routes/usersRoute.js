import express from 'express';
import user from '../controllers/usersController';
import validate from '../middleware/userMiddlerware';
import Auth from '../middleware/auth';


const usersRouter = express.Router();

usersRouter.post('/auth/signup',
  validate.validateEmail,
  validate.validateFirstName,
  validate.validateLastName,
  validate.validatePassword,
  user.signup);


usersRouter.post('/auth/signin',
  validate.validateEmail,
  validate.validatePassword,
  validate.verifyUser,
  user.login);

usersRouter.get('/:email/accounts',
  Auth.checkToken,
  validate.validateEmailParam,
  validate.checkEmail,
  user.getUserAccountList);


export default usersRouter;
