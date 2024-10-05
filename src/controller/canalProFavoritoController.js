import * as db from '../repository/canalProFavoritoRepository.js'

import { Router } from 'express';
const endpoints = Router();

endpoints.post('/canalFavorito/', async (req, resp) =>{
    try {
        let canalFavorito = req.body;
        let id = await db.inserirCanalFavorito(canalFavorito);

        resp.send({
            novoId: id
        })        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});



endpoints.get('/programaFavorito/', async (req, resp) =>{
    try {

        let registros = await db.consultarCanalFavorito();
        resp.send(registros)  
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.put('/programaFavorito/:id', async (req, resp) =>{
    try {
        let id = req.params.id;
        let canalFavorito = req.body;

        let linhasAfetadas = await db.alterarCanalFavorito(id, canalFavorito);
        if(linhasAfetadas >= 1){
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'nenhum registro encontrado '})
        } 
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/programaFavorito/:id', async (req, resp) =>{
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerCanalFavorito(id);
        if(linhasAfetadas >= 1){
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'nenhum registro encontrado '})
        }  
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;
