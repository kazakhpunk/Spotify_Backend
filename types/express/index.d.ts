import 'express';

declare global {
  namespace Express {
    interface Request {
      files?: {
        file?: {
          name: string;
          data: Buffer;
          size: number;
          encoding: string;
          tempFilePath: string;
          truncated: boolean;
          mimetype: string;
          md5: string;
          mv: (path: string, callback: (err: any) => void) => void;
        };
      };
    }
  }
}
