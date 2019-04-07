import express from 'express';
import usersRouter from './usersRoute';
import accountsRouter from './accountsRoute';
import adminRouter from './adminRoute';
import transactionRouter from './transactionRoute';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/accounts', accountsRouter);
router.use('/transactions', transactionRouter);


export default router;