import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
        },
        // coverImage: {
        //     type: String,
        //     required: [true, "Please provide a product cover image"],
        // }
        // ,
        images: [{ 
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],
        category: {
            type: String,
            required: [true, "Please provide a product category"],
            enum : {
                values: ['Shoes', 'Apparel', 'Accessories','Clothing'],
            }
        },
        stock: {
            type: Number,
            required: [true, "Please provide a product stock"],

        },
        // seller: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: [true, "Please provide a product seller"],
        // }
    } ,
    {timestamps: true}
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;