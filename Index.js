const express = require('express');
const bodyparser = require('body-parser');

const app = express().use(bodyparser.json());

app.post('/webhook', (req, res) =>{
    console.log('POST: webhook');

    const body = req.body;
    if(body.object === 'page'){

        body.entry.forEach(entry =>{

            // se reciben y procesan los mensajes

            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('Evento recibido');

    }else{
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) =>{
    console.log('GET: webhook');

    const VERIFY_TOKEN = 'stringUnicoParaTuAplicacion';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            console.log('WEBHOOK VERIFICADO');
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);

    }
}); 

app.listen('/', (req, res)=>{
    res.status(200).send('Hola!')
});

app.listen(8080, ()=>{
    console.log('Servidor iniciado...');
});
