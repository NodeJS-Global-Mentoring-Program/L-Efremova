import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (dotenv.config().error) {
  throw new Error("Couldn't find .env file");
}

const envVariables = {
  APP_NAME: process.env.APP_NAME,

  APP_PORT: process.env.APP_PORT
    ? parseInt(process.env.APP_PORT, 10)
    : undefined,

  DB_HOST: process.env.DB_HOST,

  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,

  DB_DATABASE: process.env.DB_DATABASE,

  DB_USERNAME: process.env.DB_USERNAME,

  DB_PASSWORD: process.env.DB_PASSWORD,
};

export default envVariables;
