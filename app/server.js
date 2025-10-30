const express = require('express');
const path    = require('path'); 
const mongo   = require('mongoose');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//conexão
mongo.connect('mongodb://meumongo:27017/meumongo')
    .then(() => console.log('Banco Conectado com Sucesso'))
    .catch(err => console.error('Ocorreu erro: ' + err));

//Modelos (tabelas)
const usuarioSchema = new mongo.Schema({
    nome: String,
    email: String,
    idade: Number
});

const usuario = mongo.model('Usuario', usuarioSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/Users', async (req, res) => {
    const lista = await usuario.find();
    res.json(lista);
})

app.post('/UserNovo', async(req, res) => {
    const novo = await usuario.create(req.body);
    res.json(novo);
});

const porta = process.env.PORT || 3000;

app.listen(porta, () => 
    console.log('Rodando servidor na porta: '+ porta));