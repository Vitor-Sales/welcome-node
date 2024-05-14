const express = require('express');

const app = express();

// Para poder inserir informações em JSON
app.use(express.json());

module.exports = app;