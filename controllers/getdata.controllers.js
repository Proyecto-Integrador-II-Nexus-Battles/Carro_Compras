import axios from "axios";
import { carritoModel } from "../models/crud.js";
import { response } from "express";
import { HOST } from "../config.js";



export class getDataController {

    static async ADD_CARD(req, res) {
        try {
            const { IdUsuario, IdCard } = req.body;
            await carritoModel.INSERT_CARD(IdUsuario, IdCard);
            res.status(200).json({ message: 'Carta agregada correctamente' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al insertar la carta' });
        }
    }

    static async CHANGECANT(req, res) {
        try {
            const { IdUsuario, IdCard, Cantidad } = req.body;
            await carritoModel.CHANGE_CANT(IdUsuario, IdCard, Cantidad);
            res.status(200).json({ message: 'Cantidad cambiada correctamente' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al cambiar la cantidad de la carta' });
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
            const cartas = await carritoModel.ALL_AND_COUNT(IdUsuario);
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
            axios.post(`${process.env.HOST_VITRINA}:${process.env.PORT_VITRINA}/vitrina/prices`, { cartas: list })
                .then(async response => {
                    console.log('Respuesta de la API de precios:', response.data);
                    totalNeto = response.data.reduce((acumulador, carta) => acumulador + carta.precio, 0);

                    console.log(totalNeto);
                    res.json({ 'totalNeto': totalNeto, 'divisa': response.data[0].divisa } );
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error con el servidor' });
        }

    }

    static async INFO_CARDS(req, res) {
        try {
            const { IdUsuario } = req.body;
            let list = await carritoModel.ALL(IdUsuario);
            let cantidad = await carritoModel.ALL_AND_COUNT(IdUsuario);
            let cantxprice = []

            axios.post(`${process.env.HOST_INVENTARIO}:${process.env.PORT_INVENTARIO}/inventario/getCardsbyID`, list )
                .then(async response => {

                    const info = response.data

                    let precios = info.map(carta => carta.price);
                    let cantidades = cantidad.map(c => c.CANTIDAD);

                    for (let i = 0; i < precios.length; i++){
                        let total = precios[i] * cantidades[i]
                        cantxprice.push(total)
                    }

                    const totalNeto = cantxprice.reduce((total, valorActual) => total + valorActual, 0);
                    const totalBruto = totalNeto - (totalNeto*0.19)

                    res.json({ 'Info': response.data, 'totales' : cantxprice, 'totalNeto': totalNeto, 'totalBruto' : totalBruto, 'list_price_unit' : cantidad});
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error con el servidor' });
        }
    }



}