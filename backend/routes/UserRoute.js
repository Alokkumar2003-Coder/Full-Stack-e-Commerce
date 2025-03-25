const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/AuthMiddleware");

// -----------------------------------------------------------------------------------------------------------------------

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be at least 5 characters long" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default isAdmin to false if not provided
    });

    await newUser.save();

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// -----------------------------------------------------------------------------------------------------------------------

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("solToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production" ? true : false, // Allow in dev
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin, // Ensure this is sent
      message: "Login Successful",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// -----------------------------------------------------------------------------------------------------------------------

// Logout Route
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("solToken");
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// -----------------------------------------------------------------------------------------------------------------------

// Check if cookie exists
router.get("/check-cookie", (req, res) => {
  try {
    const token = req.cookies.solToken;
    if (token) {
      return res.status(200).json({ message: true });
    }
    return res.status(200).json({ message: false });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// -----------------------------------------------------------------------------------------------------------------------

// User Detail Route
router.get("/user-details", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      address: user.address,
      totalOrders: user.totalOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------------------------------------------------------------------------------------------

module.exports = router;
