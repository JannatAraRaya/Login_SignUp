const dotenv = require("dotenv").config();
const cors = require("cors");
const { sendResponse } = require("./utils/responseHandler");
const HTTP_STATUS = require("./constants/http_codes");

// Database connection
const databaseConnection = require("./config/database");

// Express Modules
const express = require("express");
const app = express();

// Importing all the routes
const authRouter = require("./routes/auth");





app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


// Main routers
app.use("/auth", authRouter);







// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid JSON Format!");
  }
  next();
});
app.use("*", (req, res) => {
  return sendResponse(
    res,
    HTTP_STATUS.NOT_FOUND,
    "Wrong URL, Please re-check your URL."
  );
});
databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });  
});