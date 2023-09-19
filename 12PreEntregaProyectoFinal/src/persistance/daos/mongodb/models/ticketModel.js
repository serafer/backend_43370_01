import { Schema, model } from "mongoose";

export const ticketSchema = new Schema({

code:{type: String, require: true},
purchase_datetime: {type: String, require: true},
amaount: {type: Number, require: true},
purchaser: {type: String, require: true},

})

export const TicketModel = model ('ticket', ticketSchema)