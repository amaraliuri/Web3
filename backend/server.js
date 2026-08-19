const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({"message": "ola do servidor"});
});

app.get('/cep/:cep', async (req, res) => {
    const{ cep } = req.params;
    try{
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = resposta.data;

        if(dados.erro) { return res.status(404).json({erro: "CEP não encontrado"}); }

        res.status(200).json(dados);
    }catch(err){
        res.status(500).json({erro: "Erro de comunicação com VIACEP"});
    }
});

app.get('/cep/xml/:cep', async (req, res) => {
    const {cep} = req.params;

    try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/xml/`);
         
        res.set('Content-Type', 'application/xml');
        res.status(200).send(resposta.data);
    } catch (err) {
        res.status(500).json('<erro>Erro de comunicação com viacep (XML)</erro>');    
    }
});

app.get('/endereco/:uf/:cidade/:logradouro', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;
    
    try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
        
        res.status(200).json(resposta.data);
    } catch (err) {
        res.status(500).json({ erro: 'Erro de comunicação com viacep (Busca por texto)' });
    } 
});

app.listen(3001);


// npm init
// npm i express
// npm i cors
// npm i nodemon
// npm i axios
// npm run start

