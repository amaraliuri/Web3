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

app.listen(3001);


// npm init
// npm i express
// npm i cors
// npm i nodemon
// npm i axios
// npm run start

