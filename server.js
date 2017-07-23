const express = require(`express`);
const expressHandlebars = require(`express-handlebars`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const cheerio = require(`cheerio`);
const fetch = require(`node-fetch`);

const app = express();
const PORT = process.env.PORT || 3000;


const index = require(`./routes/html-routes.js`);
const API = require(`./routes/api-routes.js`);

// Namespace html routes to root
app.use('/', index);
// Name space api routes
app.use('/api', API);

// Sets up the Express app to handle data & cookie parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: `application/vnd.api+json` }));

// Set handlebars as the view engine
app.set(`views`, path.join(__dirname, `views`));
app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);
app.set(`partials`, __dirname + `views/partials`)

// Servers public content such as CSS Javascript required in the HTML files
app.use(express.static(path.join(__dirname,`public`)));


app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});