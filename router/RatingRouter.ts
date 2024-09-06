import express from "express";
import { createRate, rateArticle, viewRatedArticle } from "../controller/RatingController";
const router = express.Router();

router.route("/:userID/:articleID/rate-article").post(createRate);
router.route("/:articleID/read-rate-article").get(viewRatedArticle);
router.route("/:articleID/total-rate-article").patch(rateArticle);

export default router;
