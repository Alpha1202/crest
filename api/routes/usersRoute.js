import express from 'express';
import UserController from '../controllers/usersController';
import { validate } from '../middleware/userMiddlerware';


const usersRouter = express.Router();

usersRouter.post('/auth/signup', validate('signup'), UserController.signup);

export default usersRouter;  