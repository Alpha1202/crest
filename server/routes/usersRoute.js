import express from 'express';
import user from '../controllers/usersController';
import validate from '../middleware/userMiddlerware';
import UserHelper from '../Helpers/userHelper';



const usersRouter = express.Router();

usersRouter.post('/auth/signup',
  validate.validateEmail,
  validate.validateFirstName,
  validate.validateLastName,
  validate.validatePassword,
  user.signup);


usersRouter.post('/auth/signin',
  // validate.verifyUser,
  validate.validateEmail,
  validate.validatePassword,
  // UserHelper.allowUserOnly,
  user.login);

export default usersRouter;
