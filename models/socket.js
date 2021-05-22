const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;

    // crear la instancia de nuestro ticketList
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // on connection
    this.io.on('connection', (socket) => {
      console.log('cliente conectado');

      socket.on('request-ticket', (_data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on('next-ticket', ({ agent, desk }, callback) => {
        const yourTicket = this.ticketList.assignedTicket(agent, desk);
        callback(yourTicket);

        this.io.emit('ticket-assigned', this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
