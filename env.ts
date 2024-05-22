import { z } from 'zod';

const zodEnv = z.object({
  // AWS
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET: z.string(),
  // MongoDB
  MONGODB_ATLAS_URI: z.string(),
  MONGODB_ATLAS_DB_NAME: z.string(),
  MONGODB_ATLAS_COLLECTION_NAME: z.string(),
  MONGODB_ATLAS_INDEX_NAME: z.string(),
});

zodEnv.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof zodEnv> {}
  }
}
