import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sql from "sql"
import { connect } from "./connect.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const mysql_connect = connect();

mysql_connect.query("SELECT * FROM membri", (err, result) => {
   

    result.forEach((el) => {
        console.log(el.nickname)
    })
})


const IP = process.env.YOUR_HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
// GET FILES
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});




var options = {
  headers: {
  mode: 'no-cors'
  }
}


// questa app REST ritorna le soluzioni di un'equazione di secondo grado
app.get("/2grade", (req,res) => {

  res.json([{x1: x1, x2: x2 }])
})

// funzione per utilizzare file statici
app.use(express.static(__dirname + "/public"));

// SOCKET PART

io.on("connection", (socket) => {
  // nuovo connesso
  
});

server.listen(port, IP, () => {
  console.log("listening on port: " + port);
});
