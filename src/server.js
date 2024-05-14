const app = require('./app');

app.listen(3001, () => console.log('server is running on port 3001'));

app.get('/', (_req, res) => {
    res.send();
});
