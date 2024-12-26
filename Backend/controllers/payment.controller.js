const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require('../models/payment.model');

const razorPay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try{
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: 'order_receipt_' + new Date().getTime(),
            payment_capture: 1,
        };

        const order = await razorPay.orders.create(options);
        res.status(200).json({ orderId: order.id });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.verifyPayment = async (req, res) => {
    try{
        const { paymentId, orderId, signature } = req.body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${paymentId}|${orderId}`);
        const calculatedSignature = hmac.digest("hex"); 

        if (calculatedSignature === signature) {
            res.status(200).json({ status: "success" });
        } else {
            res.status(400).json({ status: "failure", message: 'signature mismatch' });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
}