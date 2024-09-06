import express from "express";
import {
  createAd,
  getAd,
  updateAd,
  deleteAd,
  // fetchAd,
} from "../controller/adController";

const router = express.Router();

router.route("/createAd").post(createAd);
router.route("/ad").get(getAd);
router.route("/:adID/update").patch(updateAd);
router.route("/:adID/delete").delete(deleteAd);

export default router;
