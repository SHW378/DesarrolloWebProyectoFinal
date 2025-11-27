function logErrors(err, req, res, next) {
    console.error('LOG ERROR:', err);
    next(err); // Pasa al siguiente middleware
}

function errorHandler(err, req, res, next) {
    // Si el error tiene un status code (ej. 404, 409), úsalo. Si no, 500.
    const status = err.statusCode || 500;

    res.status(status).json({
        message: err.message,
        stack: err.stack, // Muestra el detalle del error
    });
}

module.exports = { logErrors, errorHandler };