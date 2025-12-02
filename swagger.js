//Swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path')

//Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de la API', //Titulo de la documentación
    version: '1.0.0', //Version de la API
    description: 'Documentacion de la API con Swagger'
  },
  servers: [
    {
      url: '/', //URL base de la API
      description: 'Servidor de desarrollo'
    }
  ]
};

const options = {
  swaggerDefinition,
  //Paths to files
  apis: [path.join(__dirname, './routes/*.js')] //Ajustamos esto en la ruta de los archivos
};

const swaggerSpec = swaggerJSDoc(options)

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
};

module.exports = setupSwagger
