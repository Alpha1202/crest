import express from 'express';
import usersRouter from './usersRoute';
import accountsRouter from './accountsRoute';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/accounts', accountsRouter);


export default router;