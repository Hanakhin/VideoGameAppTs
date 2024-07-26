const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.VITE_STRIPE_PUBLIC_KEY); // Use process.env for environment variables
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Corrected typo
            currency: "USD",
        });
        res.json({ clientSecret: paymentIntent.client_secret }); // Corrected property name
    } catch (err) {
        res.status(500).json({ error: err.message }); // Corrected error variable
    }
});

app.listen(3001, () => {
    console.log("Server started on port 3001"); // Corrected port number
});
