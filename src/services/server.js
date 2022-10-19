const express = require('express');
const { urlencoded } = require('express');

const mainRouter = require('../routes/index')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

module.exports = app;