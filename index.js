const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middleware/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

// Middlewares 
app.use(express.json());
app.use(cors());

// Conexión a MongoDB con env vars
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error conectando a MongoDB', err));

routerApi(app);
setupSwagger(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mi port is working on: ${port}`);
    console.log(`localhost: ${port}`);
    console.log(`Docs en http://localhost:${port}/api-docs`);
});