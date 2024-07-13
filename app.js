console.log("Ready to start Web server");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); //mongodb ni storege hosil qilishga yordam beradi
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

//1-Entry Code
app.use(express.static("public")); //open Public folder for requested users
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json()); //Converst from json format to Object
app.use(express.urlencoded({ extended: true })); //to access requested post from HTML form
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

//2-Session Code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minuts
    },
    store: store,
    resave: true,
    saveUnInitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

//3-Views Code
app.set("views", "views"); //views folder path that we created
app.set("view engine", "ejs");

//4-Router related Code
app.use("/agency", router_bssr); //This router availabes only for Admin and Agency admin users
app.use("/", router);

const server = http.createServer(app);

/**SOCKET.IO BACKEND SERVER */
const io = require("socket.io")(server, {
  serveClient: false,
  origins: "*:*",
  transport: ["websocket", "xhr-polling"],
});

let online_users = 0;
io.on("connection", function (socket) {
  online_users++;
  console.log("New user, total:", online_users);
  socket.emit("greetMsg", { text: "welcome" });
  io.emit("infoMsg", { total: online_users });

  socket.on("disconnect", function () {
    online_users--;
    socket.broadcast.emit("infoMsg", { total: online_users });
    console.log("client disconnected, total:", online_users);
  });

  socket.on("createMsg", function (data) {
    console.log(data);
    io.emit("newMsg", data);
  });
});
/**SOCKET.IO BACKEND SERVER */
module.exports = server;
