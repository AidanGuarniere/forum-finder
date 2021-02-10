// requirement
const path = require('path');
const express = require('express');

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


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT ' + PORT));
});