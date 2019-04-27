import express from 'express';
import usersRouter from './usersRoute';
import accountsRouter from './accountsRoute';
import transactionRouter from './transactionRoute';
import usersAccountRouter from './userAccountRoute';


const router = express.Router();

router.use('/', usersRouter);
router.use('/accounts', accountsRouter);
router.use('/transactions', transactionRouter);
router.use('/users', usersAccountRouter);


export default router;
