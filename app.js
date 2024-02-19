const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const drinksRouter = require("./routes/api/drinks");
const filtersRouter = require("./routes/api/filters");

const { validateToken } = require("./middlewares/index");

app.use("/api/auth", authRouter);
app.use("/api/users", validateToken, usersRouter);
app.use("/api/drinks", validateToken, drinksRouter);
app.use("/api/filters", validateToken, filtersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
