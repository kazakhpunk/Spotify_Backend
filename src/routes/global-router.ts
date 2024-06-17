import { Router } from 'express';
import authRouter from './auth/auth-router';
import songRouter from './song/song-router';

const globalRouter = Router();

globalRouter.use('/auth', authRouter);
globalRouter.use('/songs', songRouter); 

export default globalRouter;
