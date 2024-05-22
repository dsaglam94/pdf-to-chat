import { z } from 'zod';

const zodEnv = z.object({
  // AWS
  NEXT_PUBLIC_AWS_REGION: z.string(),
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID: z.string(),
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: z.string(),
  NEXT_PUBLIC_AWS_BUCKET: z.string(),
});

zodEnv.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof zodEnv> {}
  }
}
