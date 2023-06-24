// Cart Schema
// User, Products(quantity, product)
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        },
        products: [
            {
                quantity: {
                    type: Number,
                    required: [true, "Please provide a quantity"],
                    min: [1, "Quantity can not be less then 1"],
                    default: 1,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Please provide a product"],
                }
            }
        ]
    }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;

