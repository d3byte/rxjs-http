const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/test', (req, res) => {
    res.json({ test: 'data' });
});

app.post('/test', (req, res) => {
    res.json({ test: 'data' });
});

app.put('/test', (req, res) => {
    res.json({ test: 'data' });
});

app.patch('/test', (req, res) => {
    res.json({ test: 'data' });
});

app.delete('/test', (req, res) => {
    res.json({ test: 'data' });
});

app.listen(process.env.PORT || 8080, () => console.log('Server started'));