const express = require('express');
const path = require('path');
const readJsonData = require('./utils/fs/readJsonData');
const writeJsonData = require('./utils/fs/writeJsonData');
const findNextId = require('./utils/fs/findNextId');

const app = express();

const PATH = path.resolve('src', 'movies.json');

// Para poder inserir informações em JSON
app.use(express.json());

app.get('/movies', async (req, res) => {
    const movies = await readJsonData(PATH);

    res.status(200).json(movies);
});

app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const moviesContent = await readJsonData(PATH);
    const findMovie = moviesContent.find((movie) => movie.id === Number(id));

    if (!findMovie) {
        return res.status(404).json({ message: 'Filme não encontrado' });
    }

    res.status(200).json(findMovie);
});

app.post('/movies', async (req, res) => {
    const movies = await readJsonData(PATH);
    const movieContent = req.body;
    const nextId = findNextId(movies);
    const newMovie = { id: nextId, ...movieContent };
    const newArray = [...movies, newMovie];
    await writeJsonData(PATH, newArray);

    res.status(201).json(newMovie);
});

module.exports = app;