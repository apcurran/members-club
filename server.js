const express = require("express");
const app = express();
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
// Import Routes
const indexRouter = require("./routes/index");

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

app.use(logger("dev"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// DB Setup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", err => console.error(err));

// Routers
app.use("/", indexRouter);

app.listen(PORT, console.log(`Server listening on port ${PORT}.`));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
  
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });