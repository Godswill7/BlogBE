import {
    deleteOneUser,
    getAllUsers, getOneUser,
    registerUser, signInUser, updateOneUser

} from './../controller/userController';
import express from "express";;
import { upload } from "../utils/multer";


const router = express.Router();

router.route("/register").post(upload, registerUser);
router.route("/:userID/get-user").get(getOneUser);
router.route("/sign-in").post(signInUser);
router.route("/get-all-users").get(getAllUsers);
router.route("/:userID/update").patch(updateOneUser);
router.route("/:userID/delete").delete(deleteOneUser);

export default router;