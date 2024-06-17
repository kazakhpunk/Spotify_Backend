import { Router } from 'express';
import fileUpload from 'express-fileupload';
import SongController from './song-controller';

const songRouter = Router();

songRouter.use(fileUpload());

songRouter.post('/', SongController.createSong);
songRouter.get('/', SongController.getSongs);
songRouter.get('/:id', SongController.getSongById);
songRouter.put('/:id', SongController.updateSong);
songRouter.delete('/:id', SongController.deleteSong);

export default songRouter;
