const express = require('express');
const bodyParser = require('body-parser');
const UsuarioController = require('./UsuarioController');

const app = express();
app.use(bodyParser.json());

const usuarioController = new UsuarioController();

app.post('/usuarios', (req, res) => usuarioController.criarUsuario(req, res));
app.get('/usuarios', (req, res) => usuarioController.listarUsuarios(req, res));

module.exports = app;