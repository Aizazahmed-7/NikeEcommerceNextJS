import express from "express";
const router = express.Router();
import Stripe from 'stripe';
import Product from "../models/product.js";



router.post('/create-checkout-session', async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { products } = req.body; // Assuming the request body contains an array of products with quantities

    try {
        let lineItems = [];

        for (const { productId, quantity } of products) {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            lineItems.push({
                price_data: {
                    currency: 'PKR',
                    product_data: {
                        name: product.name,
                        images: [product.images[0].url],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: quantity,
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/PaymentSuccessful`,
            cancel_url: `${process.env.CLIENT_URL}/Cart`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Stripe Error' });
    }
});

export default router;
