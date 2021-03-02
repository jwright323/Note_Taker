// Dependencies
const express = require("express");
const path = require("path");

// Express configuration at port 3000
const app = express();
const PORT = process.env.PORT || 8080;

// Use public folder
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Router - Points to the server to route files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});