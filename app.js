const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pg = require('pg');
const pgSessionStore = require('connect-pg-simple')(session);

const app = express();

app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: new pgSessionStore({
        pool: new pg.Pool({
            user: "postgres",
            password: "Aa123456",
            host: "127.0.0.1",
            port: 5432,
            database: "epm-db"
        })
    }),
    cookie: {
        secure: false,
        maxAge: 8640000
    }
}));

app.use((req, res, next) => {
    console.log('Session: ', req.session);
    next();
});

// Require our routes into the application.
require('./server/routes')(app);

// Handles any requests that don't match the ones above
app.use('/static', express.static(path.join(__dirname, 'client/build/static')));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// app.use('/public', express.static(path.join(__dirname, 'server/public')));

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;