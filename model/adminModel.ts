import mongoose from "mongoose";
// import { iAdmin, iAdminData } from "../utils/interface";

interface iAdmin {
  name?: string;
  password?: string;
  email?: string;
  avatar?: string;
  avatarID?: string;
  adminID: string;
  rate?: number;
  ratings?: [];
  likes?: [];
  admin?: {};
  friends?: string[];
  request?: string[];
  articles?: {}[];
  category?: [];

}

interface iAdminData extends iAdmin, mongoose.Document {}

const adminModel = new mongoose.Schema<iAdmin>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    friends: {
      type: Array<String>,
    },
    request: [
      {
        type: Array<String>,
      },
    ],
    articles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "articles",
      },
    ],
    likes: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      ],
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
    admin: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    adminID: {
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model<iAdminData>("admins", adminModel);