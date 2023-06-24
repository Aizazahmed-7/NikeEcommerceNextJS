import express from "express";
import {addReview,getReviews} from "../controller/ReviewController.js";

const router = express.Router();

router.route("/").post(addReview);
router.route("/:id").get(getReviews);

export default router;
