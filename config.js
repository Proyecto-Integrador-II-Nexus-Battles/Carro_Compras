import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;

export const HOST_DB = process.env.HOST_DB;
export const USER_DB = process.env.USER_DB;
export const PASSWORD_DB = process.env.PASSWORD_DB;
export const DATABASE = process.env.DATABASE;
export const PORT_DB = process.env.PORT_DB;
export const APP_PORT = process.env.APP_PORT;
