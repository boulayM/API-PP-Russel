const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
require("dotenv").config();

const {
  NODE_ENV,
  SWAGGER_SERVER_URL,
  URL_MONGO
} = process.env;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port de Plaisance",
      version: "1.0.0",
      description: "Documentation de l'API du Port de Plaisance",
    },
    servers: [
      {
        url: SWAGGER_SERVER_URL || "http://localhost:3000",
        description:
          NODE_ENV === "production"
            ? "Serveur de production"
            : "Serveur local (développement)",
      }
    ]
  },
  apis: [
    path.join(__dirname, "routes/**/*.js"),
    path.join(__dirname, "services/**/*.js"),
    path.join(__dirname, "middlewares/**/*.js"),
    path.join(__dirname, "models/**/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// ➤ Exportation complète
module.exports = {
  swaggerSpec,
  swaggerUi
};
