import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    // roomNumbers: [{number:Number, unavailaibleDates: {type: [Date]}}],
    // [ 
    //   {number:101, unavailaibleDates:[]}
    //   {number:102, unavailaibleDates:[]}
    // ] 

    roomNumbers: [
      {
        number: Number,
         unavailableDates: {
          type: [Date]
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);