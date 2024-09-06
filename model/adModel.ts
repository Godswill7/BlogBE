import mongoose from "mongoose"
import { iAds } from "../utils/interface"

const adData = new mongoose.Schema<iAds>(
  {
    id: {
      type:String
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    // expirationDate: {
    //   type: Date
  // }
  // createdAt: Date,
  // updatedAt: Date,
    adsURL: {
      type: String,
    },
    adsArr: {
      type: Array<String>,
    },

  },
  { timestamps: true }
);

export default mongoose.model<iAds>("ad", adData);
