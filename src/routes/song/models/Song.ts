import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  url: string;
  album?: string;
  imageUrl?: string;
}

const SongModel = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  album: { type: String },
  imageUrl: { type: String },
});

export default model<ISong>('Song', SongModel);
