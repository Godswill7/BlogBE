import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";

export const like = async (req: Request, res: Response) => {
  try {
    const { userID, likeID } = req.params;

    const User: any = await userModel.findById(userID);

    const Liker: any = await userModel.findById(likeID);

    if (User.like?.includes(User.id)) {
      return res.status(HTTP.OK).json({
        message: `${User.name} you have Already like  ${Liker.name} article`,
      });
    } else {
      await User.like?.push(User.id);
      User.save();
    }

    if (User && Liker) {
      await User.like?.push(new mongoose.Types.ObjectId(likeID!));
      User.save();
      await Liker.like?.push(new mongoose.Types.ObjectId(userID!));
      Liker.save();

      return res.status(HTTP.CREATED).json({
        message: `${User.name} you have now liked  ${Liker.name} article`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error liking user",
    });
  }
};

export const unlike = async (req: Request, res: Response) => {
  try {
    const { userID, likeID } = req.params;

    const User: any = await userModel.findById(userID);
    const Liker: any = await userModel.findById(likeID);

    if (User && Liker) {
      await User.like?.pull(new mongoose.Types.ObjectId(likeID!));
      User.save();
      await Liker.like?.pull(new mongoose.Types.ObjectId(userID!));
      Liker.save();

      return res.status(HTTP.CREATED).json({
        message: `${User.name} you have unlike ${Liker.name} article`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error unliking article",
    });
  }
};

export const viewLikes = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const User: any = await userModel.findById(userID).populate("likes");

    const Likes: any = User.like;

    return res.status(HTTP.OK).json({
      message: `${User.name} this (is/are) all your Likes`,
      data: Likes,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error getting your Likes",
    });
  }
}