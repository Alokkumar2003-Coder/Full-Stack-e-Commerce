const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userApi = require("./routes/UserRoute");
const productApi = require("./routes/Product");
const adminApi = require('./routes/AdminRoute')
const Db = require("./controllers/Db");

dotenv.config();
Db()
//require("./controllers/Redis")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); 
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/users", userApi);
app.use("/api/v1/admin", adminApi);
app.use("/api/v1/product", productApi);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
