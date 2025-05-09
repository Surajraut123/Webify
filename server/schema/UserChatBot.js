import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    ai: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
  });
  
  const chatSessionSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    sessionName: String,
    messages: [messageSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
const chatModel = mongoose.model('ChatSession', chatSessionSchema);
export default chatModel;
  