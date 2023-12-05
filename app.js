const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hbs = require('hbs');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views/partials'));

console.log('views', app.get('views'));
console.log('partials', app.get('partials'));

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

console.log(__dirname);
console.log(app.get('views'));
app.disable('view cache');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
