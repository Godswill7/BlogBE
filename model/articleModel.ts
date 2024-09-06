import mongoose from "mongoose";
import { iArticle, iArticleData } from "../utils/interface"

const articleModel = new mongoose.Schema<iArticle>(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    likes: {
      type: [{
        type: mongoose.Types.ObjectId,
        ref: "user",
      }],
    },
    userID: {
      type: String,
    },
    rate: {
      type: Number,
    },
    ratings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ratings",
      },
    ],
     categoryName: {
        type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iArticleData>("articles", articleModel);
