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

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/filters", filtersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const errorResponses = {
  400: { status: 400 },
  401: { status: 401 },
  403: { status: 403 },
  404: { status: 404 },
  409: { status: 409 },
};

app.use((err, req, res, next) => {
  if (err instanceof Error && err.status && errorResponses[err.status]) {
    const { status } = errorResponses[err.status];
    res.status(status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
