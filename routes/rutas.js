
const express = require('express');

const usersRouter = require('./usersRouter');
const zonesRouter = require('./zonesRouter');
const devicesRouter = require('./devicesRouter');
const sensorsRouter = require('./sensorsRouter');
const readingsRouter = require('./readingRouter');

function routerApi(app) {
    const router = express.Router();
    //prefijo para todas las rutas
    app.use('/api', router);

    router.use('/users', usersRouter);
    router.use('/zones', zonesRouter);
    router.use('/devices', devicesRouter);
    router.use('/sensors', sensorsRouter);
    router.use('/readings', readingsRouter);
}

module.exports = routerApi;