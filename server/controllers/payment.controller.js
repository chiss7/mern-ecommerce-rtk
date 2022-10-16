import axios from "axios";
import {
  PAYPAL_API,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  HOST,
  CLIENT_URL,
} from "../config.js";

export const Payment_PayPal = {
  createOrder: async (req, res) => {
    const cartItems = req.body.cartItems.map((item) => {
      return {
        name: item.name,
        unit_amount: { value: item.price, currency_code: "USD" },
        quantity: item.cartQuantity,
        description: item.description,
      };
    });
    console.log(cartItems);
    try {
      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: req.body.cartTotalAmount,
              breakdown: {
                item_total: { value: req.body.cartTotalAmount, currency_code: "USD" },
              },
            },
            description: "This is the payment description.",
            items: cartItems,
          },
        ],
        application_context: {
          brand_name: "Online Shop App",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          return_url: `${HOST}/payment/capture-order`,
          cancel_url: `${HOST}/payment/cancel-order`,
        },
      };

      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");

      const {
        data: { access_token },
      } = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );

      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Something went wrong with PayPal!" });
    }
  },
  captureOrder: async (req, res) => {
    const { token, PayerID } = req.query;
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    console.log(response);
    res.redirect(`${CLIENT_URL}/checkout-success`);
  },
  cancelOrder: (req, res) => {
    res.redirect(`${CLIENT_URL}/cart`);
  },
};
