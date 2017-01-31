// (C) Copyright 2014-2016 Hewlett-Packard Development Company, L.P.

// Base utils
import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSanitized from 'express-sanitized';
import path from 'path';
import colors from 'colors/safe';
import isomorphicRender from './isomorphicRender';

// Environment Variables
import env from 'node-env-file';
env(path.join(__dirname, '..', '.env'));

const PORT = process.env.PORT || 8000;
const SESSION_KEY = `t~$#z:.aNilzvrlfzEbJeyj*#17s3Ot~$#z:.aNilzvrlfzEbJeyj*#17s3O6.1sjd2o0_n8pR"mAXj27G*=Q-ki["`;

// Database
import mongoose from 'mongoose';
import db from './db';

// Routes
import api from './routes/api';
import usersApi from './routes/users';
import fileApi from './routes/file';
import postsApi from './routes/posts';
import routesApi from './routes/routes';

// Session memory store.
import session from 'express-session';
import MongoStore from 'express-session-mongo';

// Init Express server.
process.setMaxListeners(0);

const app = express();
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '20mb'
}));
app.use(bodyParser.json({limit: '20mb'}));
app.use(expressSanitized());
app.use(cookieParser());

// Sessions
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(),
    cookie: {
      httpOnly: false,
      maxAge: null
    }
  })
);

// To remove stale sessions from the DB:
// db.sessions.ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: 3600 } )
// This removes sessions older than an hour every 60 seconds.

// Allow external calls to API for dev purposes.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("X-Frame-Options", "deny");
  next();
});

// LCN add to simulate sending 200 for the re-direct
app.get('/health_check.html', function (req, res) {
  res.status(200).send('Status: OK');
});

// User Auth
import passport from 'passport';
import User from './models/User';
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Views
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', api);
app.use('/', usersApi);
app.use('/', fileApi);
app.use('/', postsApi);
app.use('/', routesApi);

// Defining the empty index key hides index.html in the dist folder.
// This provides for a cleaner dev/production environment
// while building isomorphic apps.
app.use('/', express.static(
  path.join(__dirname, '/../dist'),
  { index: '' }
));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

// Isomorphic rendering
app.use(isomorphicRender);

// Go time
const server = http.createServer(app);
server.listen(PORT);

console.log(
  colors.green(`HTTP Server started, listening at: http://localhost:${PORT}...`)
);
