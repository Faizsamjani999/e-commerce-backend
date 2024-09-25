const express = require('express');
const { createOrder, createRazorpayOrder, getAllOrders, getOrderById, getUserOrders } = require('../controller/orderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/create', verifyToken, createOrder);

// Create a Razorpay order
router.post('/razorpay', verifyToken, createRazorpayOrder);

// Get all orders (admin only)
router.get('/', verifyToken, isAdmin, getAllOrders);

// Get order by ID (admin only)
router.get('/:id', verifyToken, isAdmin, getOrderById);

// Get orders for the logged-in user
router.get('/user/orders', verifyToken, getUserOrders);

module.exports = router;
