import Product from '../models/product.js'
import  getDataUri  from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import asyncHandler from "express-async-handler";



export const CreatePost = asyncHandler(async (req, res) => {

    
    const { name, price, description, category, stock } = req.body;
    const { files } = req;

    // console.log(req.body)


    const images = files.map(file => {
        const dataUri = getDataUri(file);
        return dataUri.content;
    });

   let picture = [];

   

    for (const img of images) {
        
        try {

            const myCloud = await cloudinary.v2.uploader.upload(img, {
                transformation: [
                    { quality: 'auto' },
                    { fetch_format: 'auto', quality: 'auto' }
                ]
            });
            picture.push({
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            })
        } catch (error) {
            console.log(error);
        }


    }

    
    const product = await Product.create({
        name,
        price,
        description,
        images: picture,
        category,
        stock ,
        picture,
        // seller: req.user._id
    });


    

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });

});



// Getting All Products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category');
    res.status(200).json({
        message: "All Products",
        products
    });
});

// get latest products

export const getLatestProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    res.status(200).json({
        message: "Latest Products",
        products
    });
});



// Getting Single Product (from Id)

export const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (product) {
        console.log(product.name)
        res.status(200).json({
            message: "Product Found",
            product
        });
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});

// Updating Product

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, stock } = req.body;
    const { files } = req;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.stock = stock;
        const images = files.map(file => {
            const dataUri = getDataUri(file);
            return dataUri.content;
        });
        let picture = [];
        for (const img of images) {
            try {
                const myCloud = await cloudinary.v2.uploader.upload(img, {
                    transformation: [
                        { quality: 'auto' },
                        { fetch_format: 'auto', quality: 'auto' }
                    ]
                });
                picture.push({
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                })
            } catch (error) {
                console.log(error);
            }
        }
        product.images = picture;
        const updatedProduct = await product.save();
        res.status(200).json({
            message: "Product Updated Successfully",
            updatedProduct
        });
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});


// delete specific product

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.status(200).json({
            message: "Product Deleted Successfully"
        });
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
});


// get product of specific category
export const getProductByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    //console.log(req.params.category)
    if (products) {
        res.status(200).json({
            message: "Products of this category",
            products
        });
    } else {
        res.status(404);
        throw new Error("Products Not Found");
    }
});

// generalized search
export const searchProduct = asyncHandler(async (req, res) => {
    const { category, keyword, minPrice, maxPrice } = req.query;
    // console.log(req.query);
    // Prepare the search query based on the provided parameters
    const searchQuery = {};

    if (category != 'undefined') {
        searchQuery.category =category;
    }

    if (keyword) {
        searchQuery.name = { $regex: keyword, $options: "i" };
    }

    if (minPrice && maxPrice) {
        searchQuery.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        searchQuery.price = { $gte: minPrice };
    } else if (maxPrice) {
        searchQuery.price = { $lte: maxPrice };
    }
    // Perform the search query
    const products = await Product.find(searchQuery).populate('category');

    if(!products) {
        res.status(404);
        throw new Error("Products Not Found");
    }
    res.status(200).json({
        message: "Search results",
        products
    });
});
