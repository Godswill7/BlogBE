import express from "express";
import { makeRequest, unSendingRequest, viewRequest } from "../controller/RequestController";

const router = express.Router();

router.route("/:userID/:friendID/make-request").post(makeRequest);
router.route("/:userID/:friendID/delete-request").delete(unSendingRequest);
router.route("/:userID/view-request").get(viewRequest);

export default router;
