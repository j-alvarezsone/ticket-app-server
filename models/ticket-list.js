const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastNumber = 0;

    this.pending = [];
    this.assigned = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  // 3 que se verán en las tarjetas y 10 en el historial

  get last13() {
    return this.assigned.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignedTicket(agent, desk) {
    if (this.pending.length === 0) {
      return null;
    }

    const nextTicket = this.pending.shift();

    nextTicket.agent = agent;
    nextTicket.desk = desk;

    this.assigned.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
