import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import articleModel from "../model/articleModel";
import userModel from "../model/userModel";
import mongoose from "mongoose";
import commentModel from "../model/commentModel";

export const createComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID, articleID } = req.params;
    const { comment } = req.body;

    const user: any = await userModel.findById(userID);
    const post: any = await articleModel.findById(articleID);

    const commentData: any = await commentModel.create({
      comment,
      nameame: user.name,
      avatar: user.avatar,
    });

    post?.comments?.push(new mongoose.Types.ObjectId(commentData._id!));
    post?.save();

    return res.status(201).json({
      message: "comment created",
      data: commentData,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create comment",
    });
  }
};

export const readComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const post = await commentModel.find();

    return res.status(200).json({
      message: "read comment",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read comemnt",
    });
  }
};

export const readOneComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { commentID } = req.params;
    const post = await commentModel.findById(commentID);

    return res.status(200).json({
      message: "read comment",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read comment",
    });
  }
};

export const readArticleComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { articleID } = req.params;
    const article = await articleModel.findById(articleID).populate({
      path: "comments",
      options: {
        sort: {
          createAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "read post comment",
      data: article?.comments,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts comment",
    });
  }
};

export const likeArticleComment = async (req: Request, res: Response) => {
  try {
    const { userID, commentID } = req.params;

    const user: any = await userModel.findById(userID);
    const comment: any = await commentModel.findById(commentID);

    if (user) {
      comment?.likes?.push(new mongoose.Types.ObjectId(user._id!));
      comment?.save();

      return res.status(201).json({
        message: "like a comment",
        length: comment?.likes.length,
        data: comment,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to like Posts comment",
    });
  }
};

export const unLikeArticleComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID, commentID } = req.params;

    const user: any = await userModel.findById(userID);
    const comment: any = await commentModel.findById(commentID);

    if (user) {
      comment?.likes?.pull(new mongoose.Types.ObjectId(user._id!));
      comment?.save();

      return res.status(201).json({
        message: "unlike a Post comment",
        data: comment,
        length: comment?.likes.length,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to unlike a Posts comment",
    });
  }
};

export const deleteOneComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { articleID, commentID } = req.params;
    const article: any = await userModel.findByIdAndDelete(articleID);
    const comment: any = await commentModel.findByIdAndDelete(commentID);

    article?.comments?.pull(new mongoose.Types.ObjectId(commentID));
    article.save();

    return res.status(201).json({
      message: "read Post comment",
      data: comment,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};
