import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "dev"}.local` });

export const {
  JWT_SECRET,
  MONGO_ENDPOINT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_URL_CALLBACK,
} = process.env;
