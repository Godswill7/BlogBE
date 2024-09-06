import express from "express";
import { like, unlike, viewLikes } from "../controller/LikeController";

const router = express.Router();

router.route("/:userID/:likeID/like").post(like);
router.route("/:userID/:friendID/unlike").post(unlike);
router.route("/:userID/viewlikes").get(viewLikes);

export default router;
