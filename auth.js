const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret';

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

        res.json({
            message: 'Logged successfully',
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});