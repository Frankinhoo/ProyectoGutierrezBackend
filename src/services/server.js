const express = require('express');
const { urlencoded } = require('express');
const { productosController } = require('../controller/productos')
const { initWsServer } = require('./socket');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const { MONGO_CONNECTION_STRING } = require('../config/index');
const { loginFunc, signUpFunc } = require('./auth');
const minimist = require('minimist')

const app = express();

const ttlSeconds = 180;

//express-session
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

//Configuracion MINIMIST
const optionalArgsObject = {
    alias: {
        p: 'puerto',
    },
    default: {
        p: '8080',
    },
};

const args = minimist(process.argv, optionalArgsObject);
const PUERTO = args.puerto || 8080;

app.use(cookieParser());
app.use(session(StoreOptions));

//indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());

//permitimos que passport pueda manipular las sessiones de nuestra app
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);


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

//BORRAR DESPUES 
app.get('/api/randoms', (req, res) => {
    console.log('Resolving / endpoint');
    res.json({
        pid: process.pid,
        msg: `Hola desde puerto ${PUERTO}`,
    });
});

app.get('/slow', (req, res) => {
    console.log(`PID => ${process.pid} will work slow`);
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;
    }
    res.json({
        pid: process.pid,
        msg: `Hola desde puerto ${PUERTO}`,
        sum,
    });
});


module.exports = {
    server,
    args,
};