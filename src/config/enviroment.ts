import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "dev"}.local` });

export const { JWT_SECRET, MONGO_ENDPOINT } = process.env;
