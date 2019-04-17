import express from 'express';
import usersRouter from './usersRoute';
import accountsRouter from './accountsRoute';
import transactionRouter from './transactionRoute';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/accounts', accountsRouter);
router.use('/transactions', transactionRouter);


export default router;
