const stripeAPI = require("../stripe");
const calculateOrderAmount = require("../helpers/calculateOrder");

async function paymentIntent(req, res) {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "usd",
      description,
      payment_method_types: ["card"],
      receipt_email,
      shipping,
    });

    res
      .status(200)
      .json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create payment intent" });
  }
}

module.exports = paymentIntent;
