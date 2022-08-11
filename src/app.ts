import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mysql from "mysql";
import { connect } from "./connect.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// typescript permette questo
var mysql_connect = connect();

const IP = process.env.YOUR_HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
// GET FILES
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// funzione per utilizzare file statici
app.use(express.static(__dirname + "/public"));

// SOCKET PART

io.on("connection", (socket) => {


  socket.on("data", (req, res) => {
    // questa è una cosa brutta da fare. connettersi costa tempo e denaro!
    mysql_connect = connect();
    mysql_connect.query("SELECT * FROM membri", (err, result) => {
      socket.emit("new_data", result);
      mysql_connect.end();
    });
  });
});

server.listen(port, () => {
  console.log("listening on port: " + port);
});
