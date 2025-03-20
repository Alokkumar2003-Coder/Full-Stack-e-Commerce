const express = require("express");
const router = express.Router();
const { adminAuth, auth } = require("../middleware/adminAuth");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// Get all products
router.get("/get-products", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get("orders", auth, async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
