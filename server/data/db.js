import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const encodedPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const userName = process.env.MONGO_USERNAME
const url = `mongodb+srv://${userName}:${encodedPassword}@webifycluster.wzcjdk8.mongodb.net/`;

export default mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to db"))
  .catch((e) => console.log("Error: ", e));
