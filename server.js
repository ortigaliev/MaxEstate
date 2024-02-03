const http = require("http");
const mongodb = require("mongodb");


let db;
const connectionString = "mongodb+srv://Max_Mit7:ONHKVnH0aCQu9PQ0@mit-7.fpdtxon.mongodb.net/My_Plan";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
(err, client) => {
  if (err) console.log("ERROR on connection MongoDB");
  else {
    console.log("MongoDB connection succeed");
    module.exports = client;

    const app = require("./app");
    const server = http.createServer(app);
    let PORT = 3001;
    server.listen(PORT, function() {
    console.log(`The server successfully run on PORT: ${PORT}, http://localhost:${PORT}`);
    });
  }
}
);