const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;
require('dotenv/config');

const api = process.env.API_URL;
app.use(cors());
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productRouter = require('./routers/products');
const CategoryRouter = require('./routers/category');

//Routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, CategoryRouter);

//Schema
const Product = require('./models/product');
const Category = require('./models/category');

mongoose
  .connect(process.env.CONNECTION_STRING, { dbName: 'pokemonDB' })
  .then(() => {
    console.log('DB Connection is ready');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log('Server is running in ' + PORT);
});
