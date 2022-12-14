const express = require('express');
const { urlencoded } = require('express');
const { productosController } = require('../controller/productos')
const { initWsServer } = require('./socket');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MONGO_CONNECTION_STRING } = require('../config/index');

const app = express();

const ttlSeconds = 180;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: MONGO_CONNECTION_STRING,
        crypto: {
            secret: '1234'
        },
    }),
    secret: 'secretString',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000
    },
};

app.use(cookieParser());
app.use(session(StoreOptions));


const mainRouter = require('../routes/index');
const { config } = require('dotenv');


const server = http.Server(app);
initWsServer(server)

app.use(express.static('public'));

//Config de plantillas ejs
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