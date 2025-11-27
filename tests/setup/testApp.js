// tests/setup/testApp.js
process.env.NODE_ENV = "test";

const express = require("express");
const reservationsRouter = require("../../routes/reservations");
const usersRouter = require("../../routes/users"); // may exist in your project
const catwaysRouter = require("../../routes/catways"); // may exist
const bodyParser = require("body-parser");

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // mount routers if they exist
  try { app.use("/reservations", reservationsRouter); } catch (e) {}
  try { app.use("/users", usersRouter); } catch (e) {}
  try { app.use("/catways", catwaysRouter); } catch (e) {}
  // fallback error handler for tests to see stack
  app.use((err, req, res, next) => {
    // send HTML stack or json if set
    if (res.headersSent) return next(err);
    res.status(err.status || 500).send(err.stack || String(err));
  });
  return app;
}

module.exports = createTestApp;
