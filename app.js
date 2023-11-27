const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hbs = require('hbs');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/.env' });

// Connect DB
connectDB();

const app = express();

// Initialize passport
app.use(passport.initialize());

// Passport config
require('./config/passport')(app, passport);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.set('view engine', '.hbs');

// Set session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
