import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

// Middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Public Routes
router.get("/", fetchProducts);
router.get("/allproducts", fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.post("/filtered-products", filterProducts);
router.get("/:id", checkId, fetchProductById);

// Review Route (Requires Auth)
router.post("/:id/reviews", authenticate, checkId, addProductReview);

// Admin Routes
router.post("/", authenticate, authorizeAdmin, formidable(), addProduct);
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  checkId,
  formidable(),
  updateProductDetails
);
router.delete("/:id", authenticate, authorizeAdmin, checkId, removeProduct);

export default router;
