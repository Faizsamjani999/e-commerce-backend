const Order = require('../model/Order');
const Razorpay = require('razorpay');

// Fetch Razorpay credentials from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new order
const createOrder = async (req, res) => {
  const { cartItems, shippingAddress, paymentMethod, amount } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      cartItems,
      shippingAddress,
      paymentMethod,
      amount
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Create a Razorpay order
const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'order_receipt_' + new Date().getTime(),
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create Razorpay order", error: err.message });
  }
};

// Fetch all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Fetch a single order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

// Fetch orders for the logged-in user
const getUserOrders = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const orders = await Order.find({ user: userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
  };

module.exports = {
  createOrder,
  createRazorpayOrder,
  getAllOrders,
  getOrderById,
  getUserOrders
};
