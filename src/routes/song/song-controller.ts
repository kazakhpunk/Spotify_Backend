import { Request, Response } from 'express';
import * as songService from './song-service';

class SongController {
  async createSong(req: Request, res: Response) {
    try {
      const { title, artist, album, imageUrl, url } = req.body;
      const newSong = await songService.createSong(title, artist, album, imageUrl, url);
      res.status(201).json(newSong);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ message: 'Error creating song', error: errorMessage });
    }
  }

  async getSongs(req: Request, res: Response) {
    try {
      const songs = await songService.getSongs();
      res.status(200).json(songs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ message: 'Error fetching songs', error: errorMessage });
    }
  }

  async getSongById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const song = await songService.getSongById(id);
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }
      res.status(200).json(song);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ message: 'Error fetching song', error: errorMessage });
    }
  }

  async updateSong(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, artist, album, imageUrl, url } = req.body;
      const updatedSong = await songService.updateSong(id, title, artist, album, imageUrl, url);
      res.status(200).json(updatedSong);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ message: 'Error updating song', error: errorMessage });
    }
  }

  async deleteSong(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await songService.deleteSong(id);
      res.status(200).json({ message: 'Song deleted' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ message: 'Error deleting song', error: errorMessage });
    }
  }
}

export default new SongController();
