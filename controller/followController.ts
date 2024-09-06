import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";

export const follow = async (req: Request, res: Response) => {
  try {
    const { authorID, followerID } = req.params;

    const author: any = await userModel.findById(authorID);
    const follower: any = await userModel.findById(followerID);

    if (!author) {
      console.log(`Author with ID ${authorID} not found`);
    }

    if (!follower) {
      console.log(`Follower with ID ${followerID} not found`);
    }

    if (author && follower) {
      await author.followers?.push(new mongoose.Types.ObjectId(followerID!));
      await author.save();
      await follower.following?.push(new mongoose.Types.ObjectId(authorID!));
      await follower.save();

      return res.status(HTTP.CREATED).json({
        message: `${follower.name} you are now following  ${author.name}`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
      message1: "Error creating followers",
    });
  }
};

export const unFollow = async (req: Request, res: Response) => {
  try {
    const { authorID, followerID } = req.params;

    const author: any = await userModel.findById(authorID);
    const follower: any = await userModel.findById(followerID);

    if (!author) {
      console.log(`Author with ID ${authorID} not found`);
    }

    if (!follower) {
      console.log(`Follower with ID ${followerID} not found`);
    }

    if (author && follower) {
      await author.followers?.pull(new mongoose.Types.ObjectId(followerID!));
      await author.save();
      await follower.following?.pull(new mongoose.Types.ObjectId(authorID!));
      await follower.save();

      return res.status(HTTP.CREATED).json({
        message: `you are no longer following ${author.name}`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error removing followers",
    });
  }
};


