const express = require('express');
const path = require('path');
const { write } = require('fs');
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

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movieContent = req.body;
    const movies = await readJsonData(PATH);
    const newContent = movies.map((movie) => {
        if (movie.id === Number(id)) return { id: Number(id), ...movieContent };
        return movie;
    });

    await writeJsonData(PATH, newContent);

    res.status(200).json({ id: +id, ...movieContent });
});

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movies = await readJsonData(PATH);
    const newArray = movies.filter((movie) => movie.id !== +id);
    await writeJsonData(PATH, newArray);

    res.status(200).json({ message: 'Filme deletado com sucesso' });
});

module.exports = app;