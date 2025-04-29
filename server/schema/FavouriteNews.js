import mongoose from 'mongoose'

const favSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true
    },
    newsList: [
      {
        data: {
          type: Object,
          required: true
        },
        shared: {
          type: [String],
          default: []
        }
      }
    ]
  });
  
const Favourite = mongoose.model("Favourite", favSchema)
export default Favourite;