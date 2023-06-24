import Review from "../models/review.js";
import  getDataUri  from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import asyncHandler from "express-async-handler";

// add Review
// POST /api/reviews
export const addReview = asyncHandler(async (req, res) => {
    const { comment, rating, productId } = req.body;
    const user = req.user._id;
    const review = new Review({
        comment,
        rating,
        productId,
        user,
    });
    const createdReview = await review.save();
    res.status(201).json(createdReview);
    });

// Get Reviews for a product
// GET /api/reviews/:id

export const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ productId: req.params.id }).populate(
        "user",
        "name"
    );
    res.json(reviews);
});


