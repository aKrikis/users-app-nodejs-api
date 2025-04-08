const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


app.use(express.json());

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes');
const auth = require('./routes/auths.routes');

// USERS
app.use('/api/users', user);

// PRODUCTS
app.use('/api/user-product', userProduct);

// AUTHs
app.use('/api/auth', auth)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));








module.exports = app;