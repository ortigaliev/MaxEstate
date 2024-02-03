console.log("Ready to start Web server");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = require("./router");

//MONGO DB connection
const db = require("./server").db();
const mongodb = require("mongodb");

//1-Entry Code
app.use(express.static("public")); //open Public folder for requested users
app.use(express.json()); //Converst from json format to Object
app.use(express.urlencoded({ extended: true})); //to access requested post from HTML form


//2-Session Code

//3-Views Code
app.set("views", "views");//views folder path that we created
app.set("view engine", "ejs");

//4-Router related Code
app.use("/", router);

module.exports =app;