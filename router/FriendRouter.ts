import express from "express"
import { beFriend, unFriend, viewFriends } from "../controller/FriendsController";


const router = express.Router();

router.route("/:userID/:friendID/add-friend").post(beFriend);
router.route("/:userID/:friendID/un-friend").post(unFriend);
router.route("/:userID/view-friends").get(viewFriends);

export default router;