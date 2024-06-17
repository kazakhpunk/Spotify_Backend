declare namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      PORT?: string;
      AWS_REGION: string;
      AWS_BUCKET_NAME: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
  