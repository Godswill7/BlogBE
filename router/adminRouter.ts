import express from 'express';
import {  getAllAdmins, getOneAdmin, postAdByAdmin, registerAdmin, signInAdmin } from '../controller/adminController';
import { upload } from '../utils/multer';


const router = express.Router();


router.route('/admin/ads').post(postAdByAdmin);
router.route("/register-admin").post(upload, registerAdmin);
router.route("/sign-in").post(signInAdmin);
router.route("/get-admins").get(getAllAdmins);
router.route("/:userID/get-one-admin").get(getOneAdmin);

export default router;
