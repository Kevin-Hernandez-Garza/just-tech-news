const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
// importing helper functions
const helpers = require('./utils/helpers');
// setting handlebars as our app's template engine of choice
const exphbs = require('express-handlebars');
// passing the helpers functions in this statement 
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

//setting up express.js session and connects our session to our Sequelize database
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {}, 
  resave: false, 
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});