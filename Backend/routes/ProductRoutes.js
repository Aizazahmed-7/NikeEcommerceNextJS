import { CreatePost,getAllProducts,getSingleProduct,
    updateProduct,deleteProduct,getProductByCategory,searchProduct, getLatestProducts } from "../controller/ProductController.js";
import express from "express";
import  multipleUpload  from "../middleware/multer.js";


const router = express.Router();

router.route("/createProduct").post(multipleUpload , CreatePost);
router.route("/getLatestProducts").get(getLatestProducts);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getSingleProduct/:id").get(getSingleProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/getProductByCategory/:category").get(getProductByCategory);

// query parameters are category,keyword,maxPrice,minPrice
// E.g http://localhost:5001/api/products/searchProduct?category=Shoes&keyword=Nike&minPrice=10&maxPrice=200
router.route("/searchProduct").get(searchProduct);



export default router;


