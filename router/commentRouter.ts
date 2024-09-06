import express, { Router } from "express";
import {
  createComment,
  deleteOneComment,
  likeArticleComment,
  readComment,
  readOneComment,
  readArticleComment,
  unLikeArticleComment,
} from "../controller/commentController";

const router: Router = express.Router();

router.route("/:userID/:articleID/create-comment").post(createComment);

router.route("/comments").get(readComment);

router.route("/:commentID/comment-detail").get(readOneComment);

router.route("/:articleID/read-post-comment").get(readArticleComment);

router.route("/:userID/:commentID/like-comment").patch(likeArticleComment);

router.route("/:userID/:commentID/unlike-comment").patch(unLikeArticleComment);

router.route("/:articleID/:commentID/delete-comment").delete(deleteOneComment);

export default router;
