import express from 'express';
import usersRouter from './usersRoute';
import accountsRouter from './accountsRoute';
import adminRouter from './adminRoute';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/accounts', accountsRouter);


export default router;