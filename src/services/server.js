const express = require('express');
const { urlencoded } = require('express');
const { productosController } = require('../controller/productos')
const {initWsServer} = require('./socket')
const http = require('http');
const path = require('path');


const mainRouter = require('../routes/index')

const app = express();
const server = http.Server(app);
initWsServer(server)

app.use(express.static('public'));

const pathViews = path.resolve(__dirname, '../../views')
app.set('view engine', 'ejs');
app.set('views', pathViews);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

app.get('/', async (req, res) => {
    const productos = await productosController.getAll();
    res.render('index', {productos})
});


module.exports = server;