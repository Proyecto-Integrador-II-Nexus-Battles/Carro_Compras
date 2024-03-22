import pool from '../models/dbconection.js';

export class carritoModel{

    static async INSERT_CARD(ID_USUARIO, CARTA_ID, CANTIDAD){
        try {
            const exist = await pool.query(` SELECT COUNT(*) AS count FROM ITEM_CARRO WHERE ID_USUARIO = ? AND CARTA_ID = ? `, [ID_USUARIO, CARTA_ID]);

            if(exist[0].count > 0){

                const result = await pool.query(
                    'UPDATE ITEM_CARRO SET CANTIDAD = ?, FECHA_AGREGADO = NOW() WHERE ID_USUARIO = ? AND CARTA_ID = ?',
                    [CANTIDAD, ID_USUARIO, CARTA_ID]
                );
                return result;

            }else{

                const insertQuery = `
                INSERT INTO item_carro
                (ID_USUARIO, CARTA_ID, CANTIDAD, FECHA_AGREGADO) 
                VALUES 
                (?, ?, ?, NOW());
              `;
          
              const result = await pool.query(insertQuery, [Number(ID_USUARIO), Number(CARTA_ID), Number(CANTIDAD)]);
              return result;

            }

          } catch (error) {
            console.error('Error al insertar la carta:', error);
            throw error;
          }
    }

    static async DELETE(ID_USUARIO, CARTA_ID){
        try {

            const exist = await pool.query(` SELECT COUNT(*) AS count FROM ITEM_CARRO WHERE ID_USUARIO = ? AND CARTA_ID = ? `, [ID_USUARIO, CARTA_ID]);
            if(exist[0].count > 0){

                const result = await pool.query(
                    'DELETE FROM ITEM_CARRO WHERE ID_USUARIO = ? AND CARTA_ID = ?',
                    [ID_USUARIO, CARTA_ID]
                );
                return result;

            }

          } catch (error) {
            console.error('Error al eliminar la carta:', error);
            throw error;
          }
    }

    static async ALL(ID_USUARIO){
        try {

            const exist = await pool.query(` SELECT COUNT(*) AS count FROM ITEM_CARRO WHERE ID_USUARIO = ? `, [ID_USUARIO]);
            if(exist[0].count > 0){

                const result = await pool.query(
                    'SELECT * FROM ITEM_CARRO WHERE ID_USUARIO = ?',
                    [ID_USUARIO]
                );
                
                const cartaIDs = result.map(row => row.CARTA_ID);
                return cartaIDs;

            }else{

                const result = 'No hay productos agregados';
                return result;

            }
          } catch (error) {
            console.error('Error al eliminar la carta:', error);
            throw error;
          }
    }

    static async ALL_AND_COUNT(ID_USUARIO){
        try {
            const exist = await pool.query(`SELECT COUNT(*) AS count FROM ITEM_CARRO WHERE ID_USUARIO = ?`, [ID_USUARIO]);
            if(exist[0].count > 0){
                const result = await pool.query(
                    'SELECT CARTA_ID, CANTIDAD, ID_USUARIO FROM ITEM_CARRO WHERE ID_USUARIO = ?',
                    [ID_USUARIO]
                );
                return result;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            throw error;
        }
    }

}