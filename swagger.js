const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');


module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
