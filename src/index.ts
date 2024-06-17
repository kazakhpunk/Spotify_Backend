import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { logRequest, logError, logInfo } from './logger';
import globalRouter from './routes/global-router';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(globalRouter);

async function connectDB() {
  const mongoUri = process.env.MONGODB_URL;
  if (!mongoUri) {
    logError('MONGODB_URL is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    logInfo('MongoDB connected');
  } catch (error) {
    if (error instanceof Error) {
      logError(`MongoDB connection error: ${error.message}`);
    } else {
      logError('MongoDB connection error');
    }
    process.exit(1);
  }
}

connectDB();

app.get('/', (req: Request, res: Response) => res.send('API running'));

app.use(logRequest);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logError(err.stack || err.message || 'Unknown error');
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
