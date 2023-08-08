import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const ChatModel = mongoose.model("chats", chatSchema);