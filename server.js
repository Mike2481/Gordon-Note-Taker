// require express, fs, and path
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const fs = require("fs");
// const path = require("path");
// set port to 3001 as a default
const PORT = process.env.PORT || 3001;
// const store = require("./db/store");

const app = express();
// import the db.json file
// const notes = require("./db/db.json");

//  required in order to post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// instructs the server to make certain files readily available
// and to not gate it behind a server endpoint
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3001");
});


