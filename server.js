const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
    const userData = req.body;
    console.log('User data received:', userData);
    res.status(201).send({ message: 'User data stored successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
