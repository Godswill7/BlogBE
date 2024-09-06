import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";

export const beFriend = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const User: any = await userModel.findById(userID);

    const Friend: any = await userModel.findById(friendID);


       if (User.friends?.includes(User.id)) {
         return res.status(HTTP.OK).json({
           message: `${User.name} you are Already friends with ${Friend.name}`,
         });
       } else {
         User.friends?.push(User.id);
         User.save();
      }
      
    if (User && Friend) {
      await User.friends?.push(new mongoose.Types.ObjectId(friendID!));
      User.save();
      await Friend.friends?.push(new mongoose.Types.ObjectId(userID!));
      Friend.save();

      return res.status(HTTP.CREATED).json({
        message: `${User.name} you are now friends with ${Friend.name}`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating friends",
    });
  }
};

export const unFriend = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const User: any = await userModel.findById(userID);
    const Friend: any = await userModel.findById(friendID);

    if (User && Friend) {
      await User.friends?.pull(new mongoose.Types.ObjectId(friendID!));
      User.save();
      await Friend.friends?.pull(new mongoose.Types.ObjectId(userID!));
      Friend.save();

      return res.status(HTTP.CREATED).json({
        message: `${User.name} you are no longer friends with ${Friend.name}`,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error removing friends",
    });
  }
};

export const viewFriends = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const User: any = await userModel.findById(userID).populate("friends");

    const friends: any = User.friends;

    return res.status(HTTP.OK).json({
      message: `${User.name} this (is/are) all your friends`,
      data: friends,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error getting your friends",
    });
  }
};
