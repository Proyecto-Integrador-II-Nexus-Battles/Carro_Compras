import axios from "axios";
import { carritoModel } from "../models/crud.js";
import { response } from "express";

export class getDataController {

    static async ADD_CARD(req, res) {
        try {
            const { IdUsuario, IdCard, Cantidad } = req.body;
            await carritoModel.INSERT_CARD(IdUsuario, IdCard, Cantidad);
            res.status(200).json({ message: 'Carta agregada correctamente' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al insertar la carta' });
        }
    }

    static async DELETE_CARD(req, res) {
        try {
            const { IdUsuario, IdCard } = req.body;
            await carritoModel.DELETE(IdUsuario, IdCard);
            res.status(200).json({ message: 'Carta eliminada correctamente' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }

    static async LIST_CARD(req, res) {
        try {
            const { IdUsuario } = req.body;
            const cartas = await carritoModel.ALL(IdUsuario);
            res.status(200).json({ cartas })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar los productos' });
        }
    }

    static async PRICE_CARD(req, res) {
        try {
            const { IdUsuario } = req.body;
            const list = await carritoModel.ALL(IdUsuario);
            let totalNeto = 0
            axios.post('http://localhost:3000/asdsad', { cards: list })
                .then( async response => {
                    console.log('Respuesta de la API de precios:', response.data);
                    totalNeto = response.data.reduce((acumulador, carta) => acumulador + carta.precio, 0);

                    console.log(totalNeto);
                    res.json({'totalNeto': totalNeto, 'divisa': response.data[0].divisa, 'IdUsuario': IdUsuario, 'list' : list});
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
            });



        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error con el servidor' });
        }

    }



}