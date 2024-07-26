import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
import { createResponse } from "../utils.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await ticketService.generateTicket(user);
      if(!ticket) createResponse(res, 404, 'Error generate ticket');
      else createResponse(res, 200, ticket);
    } catch (error) {
      next(error);
    }
  }
}
