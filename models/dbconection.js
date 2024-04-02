import mariadb from "mariadb";
import { PORT_DB, PASSWORD_DB, USER_DB, HOST_DB, DATABASE } from "../config.js";

export const pool = mariadb.createPool({
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE,
  port: PORT_DB,
});

export default pool;
