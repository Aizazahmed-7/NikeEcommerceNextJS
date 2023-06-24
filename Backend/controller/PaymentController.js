import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import asyncHandler from "express-async-handler";
import stripe from 'stripe';

// Initialize the Stripe instance with the secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = asyncHandler(async (req, res, next) => {
    console.log(req.headers.authorization)
    const myPayment = await stripeInstance.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        payment_method_types: ['card'],
        },
        {
            idempotencyKey: req.headers.authorization
        }
    );

    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = asyncHandler(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_SECRET_KEY });
});
