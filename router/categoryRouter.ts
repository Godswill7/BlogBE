import express from "express"
import { createCategory, viewCategory } from "../controller/categoryController";

const router = express.Router();

router.route("/view-cat").get(viewCategory)
router.route("/:userID/:articleID/cat").post(createCategory)

export default router