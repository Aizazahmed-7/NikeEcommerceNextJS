import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cloudinary from 'cloudinary';
import ProductRoutes from './routes/ProductRoutes.js';
import ReviewRoutes from "./routes/ReviewRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import cors from 'cors';



dotenv.config();

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
    });


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
}))


app.use("/api/products",ProductRoutes);
app.use("/api/reviews",ReviewRoutes);
app.use("/api/payment",PaymentRoutes);


app.get('/', (req, res) => {
    res.send('API is running...');
})

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server started on port ${process.env.PORT || 5001}`);
});