// requirements
const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setting up sess (our cookies)
// This code sets up an Express.js session and connects the session to our Sequelize database.
const sess = {
  secret: 'SuperSecretTestMaster',
  cookie: {
    // Session expires every ten minutes
    expires: 10 * 60 * 1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

//for handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

// For cookies
app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT ' + PORT));
});