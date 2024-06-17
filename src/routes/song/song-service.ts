import SongModel from './models/Song';

export const createSong = async (title: string, artist: string, album: string, imageUrl: string, url: string) => {
  const newSong = new SongModel({ title, artist, album, imageUrl, url });
  return await newSong.save();
};

export const getSongs = async () => {
  return await SongModel.find().exec();
};

export const getSongById = async (id: string) => {
  return await SongModel.findById(id);
};

export const updateSong = async (id: string, title: string, artist: string, album: string, imageUrl: string, url: string) => {
  const song = await SongModel.findById(id);
  if (!song) throw new Error('Song not found');

  song.title = title;
  song.artist = artist;
  song.album = album;
  song.imageUrl = imageUrl;
  song.url = url;

  return await song.save();
};

export const deleteSong = async (id: string) => {
  return await SongModel.deleteOne({ _id: id });
};
