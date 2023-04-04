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
const minimist = require('minimist');
const compression = require('compression');
const log4js = require('log4js');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

app.use(compression());

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

//LOGGERS
log4js.configure({
    appenders: {
        console: { type: 'console' },
        appWarn: { type: 'file', filename: './logs/warn.log' },
        appError: { type: 'file', filename: './logs/error.log' },
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        catA: { appenders: ['console'], level: 'warn' },
        "catA.Warn": { appenders: ['appWarn'], level: 'warn' },
        "catA.Error": { appenders: ['appError'], level: 'error' },
    },
});

const logger = log4js.getLogger();
const loggerA = log4js.getLogger("catA.Warn");
const loggerB = log4js.getLogger("catA.Error");

//SWAGGER
const swaggerPath = path.resolve(__dirname, '../../swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


module.exports = {
    server,
    args,
};