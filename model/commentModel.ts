import mongoose from "mongoose";
import { iComment } from "../utils/interface";

interface iCommentData extends iComment, mongoose.Document {}

const commentModel = new mongoose.Schema(
  {
    comment: {
      type: String,
    },

    name: {
      type: String,
    },

    avatar: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "auths",
      },
    ],

    article: {
      type: mongoose.Types.ObjectId,
      ref: "article",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iCommentData>("comments", commentModel);
