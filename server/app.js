// CORE MODULES
const path = require("path");

// EXTERNAL MODULES
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// LOCAL MODULES
const rootDir = require("./utils/pathUtils");
const errorController = require("./controllers/errors");
const TodoItemRouter = require("./routes/TodoItemRouter");

const DB_PATH = process.env.MONGO_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// creating app
const app = express();

//
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      FRONTEND_URL, // deployed frontend from env
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// granting access to public folder
app.use(express.static(path.join(rootDir, "public")));

// Routing handling
app.use("/api/todos", TodoItemRouter);
// unknown routing handling
app.use(errorController.pageNotFound);

// starting server after connecting to db
const PORT = process.env.PORT || 3000;

// connecting to mongodb
// if connection is successful, server starts listening on PORT
// if connection fails, error is logged to console
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongoDb");
    app.listen(PORT, () =>
      console.log(`server is running at address-http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("cant connect to mongodb");
  });
