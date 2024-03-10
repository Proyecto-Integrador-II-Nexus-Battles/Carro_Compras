import mariadb from "mariadb";

export const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'carro_compras',
    port: '3307'
})

export default pool;