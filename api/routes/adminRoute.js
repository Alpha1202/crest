import express from 'express';
import AdminController from '../controllers/adminController';
import { validate } from '../middleware/userMiddlerware';


const adminRouter = express.Router();

adminRouter.post('/auth/signup', validate('signup'), AdminController.signup);
adminRouter.post('/auth/signin',  validate('signin'), AdminController.login);

export default adminRouter;  