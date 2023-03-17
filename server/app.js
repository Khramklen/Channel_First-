/* eslint-disable consistent-return */
require('dotenv').config();
require('@babel/register');
const express = require('express');

const app = express();

const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const dbCheck = require('./db/dbCheck');

const MainRoutes = require('./routes/MainRoutes');
const authRoutes = require('./routes/authRoutes');
const logoutRoutes = require('./routes/logoutRoutes');

dbCheck();
const userCheck = require('./middlewares/userCheck');

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

const accessList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'];
app.use(cors({ origin: accessList, credentials: true, allowedHeaders: ['content-type'] }));

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (accessList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
});
const httpLogger = require('./httpLogger');

app.use(httpLogger);

const {
  PORT,
  SECRET,
} = process.env;

const sessionConfig = {
  name: '1_Test',
  store: new FileStore(),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000000 * 24 * 60 * 60,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));

app.use('/', authRoutes);
app.use('/main', MainRoutes);
app.use('/logout', userCheck, logoutRoutes);

app.use((req, res) => {
  res.status(404).send('Sorry, something wrong.');
});

app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
