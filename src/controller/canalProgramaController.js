import * as db from '../repository/canalProgramaRepository.js'

import { Router } from 'express';
const endpoints = Router();

endpoints.post('/programa/', async (req, resp) =>{
    try {
        let canalPrograma = req.body;
        let id = await db.inserirCanalPrograma(canalPrograma);

        resp.send({
            novoId: id
        })        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});



endpoints.get('/programa/', async (req, resp) =>{
    try {

        let registros = await db.consultarCanalPrograma();
        resp.send(registros)  
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.put('/programa/:id', async (req, resp) =>{
    try {
        let id = req.params.id;
        let canalPrograma = req.body;

        let linhasAfetadas = await db.alterarCanalPrograma(id, canalPrograma);
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

endpoints.delete('/canal/:id', async (req, resp) =>{
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerCanalPrograma(id);
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
