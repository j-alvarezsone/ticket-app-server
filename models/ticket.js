const { v4: uuidV4 } = require('uuid');
class Ticket {
  constructor(number) {
    this.id = uuidV4();
    this.number = number;
    this.desk = null;
    this.agent = null;
  }
}

module.exports = Ticket;
