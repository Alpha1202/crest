import express from 'express';
import usersRouter from './usersRoute';

const router = express.Router();

router.use('/users', usersRouter);


export default router;