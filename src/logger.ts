import { NextFunction, Request, Response } from 'express';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.log(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${
        res.statusCode
      }`
    );
  });
  next();
};

const logError = (message: string) => {
  console.error(`Error: ${message}`);
};

const logInfo = (message: string) => {
  console.log(`Info: ${message}`);
};

export { logRequest, logError, logInfo };
