import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
        },
        rating: {
            type: Number,
            required: [true, "Please provide a rating"],
            min: 1,
            max: 5,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide a product"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        }
    }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;