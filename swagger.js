const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Contract SIMS PPOB",
      version: "1.0.0",
      description: "Documentation for Take Home Test API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "ppob-api-production.up.railway.app/api",
      },
    ],
  },
  apis: [
    "./routes/membershipRoutes.js",
    "./routes/informationRoutes.js",
    "./routes/transactionRoutes.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
