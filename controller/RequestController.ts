import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../model/userModel";
import { HTTP } from "../error/mainError";

export const makeRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const User: any = await userModel.findById(userID);
    const Friend: any = await userModel.findById(friendID);

    if (User.friends.includes(friendID)) {
      return res.status(HTTP.);
    }

    if (User && Friend) {
      Friend!.request.push(new mongoose.Types.ObjectId(userID));
      Friend.save();

      return res.status(HTTP.OK).json({
        message: "Your resquest has been sent",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error making request",
    });
  }
};

export const unSendingRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const User: any = await userModel.findById(userID);
    const Friend: any = await userModel.findById(friendID);

    if (User && Friend) {
      Friend!.request.pull(new mongoose.Types.ObjectId(userID));
      Friend.save();

      return res.status(HTTP.CREATED).json({
        message: "Your resquest has been removed",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error removing request",
    });
  }
};

export const viewRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const User: any = await userModel.findById(userID);

    if (User) {
      const data = await userModel.findById(userID).populate({
        path: "request",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      });

      return res.status(HTTP.OK).json({
        message: "viewing request",
        data,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
