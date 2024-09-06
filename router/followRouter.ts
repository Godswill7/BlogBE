import express from "express"
import { follow, unFollow } from "../controller/followController"

const router = express.Router()

router.route("/:followerID/:authorID/follow").post(follow);
router.route("/:followerID/:authorID/unfollow").delete(unFollow);

export default router