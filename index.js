// ------ Imports
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

// ------ Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// middleware for JSON testing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

// ------ Routes
const searchRouter = require("./routes/searchRouter");
app.use("/", searchRouter);

// ------ Port
const PORT = 3000;
app.listen(PORT, () => console.log(`server is listening at port ${PORT}`))