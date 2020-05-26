const { Router } = require('express');
const jwt = require('jsonwebtoken');

const auth = Router();

const privateKey = require('../privateKey');

auth.post('/',
    (req, res) => {
        const token = jwt.sign({}, privateKey, { expiresIn: '100000s' });
        res.send(token);
    });

module.exports = auth;