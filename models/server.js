const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
// servidor de sockets
const http = require('http');
const Sockets = require('./socket');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = http.createServer(this.app);

    // configuración de socket
    this.io = socketIo(this.server, {
      /*configuraciones */
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    // cors
    this.app.use(cors());
  }

  socketsConfig() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar middlewares
    this.middlewares();

    // inicializar sockets
    this.socketsConfig();

    // inicializar server
    this.server.listen(this.port, () => {
      console.log(`Server is running on ${this.port}`);
    });
  }
}

module.exports = Server;
