const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRouter");
const orderRoutes = require("./routers/orderRoutes");
const adminRoutes = require("./routers/adminRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

//setup server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.json());
app.use(cookieParser());

//allow client make req,res & save cookie 
app.use(cors({
  origin:["safe-courier-phillip.netlify.app"],
  credentials:true
}));

//connect to mongoDB
mongoose.connect(
  process.env.DB_URL_DEV,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true

  }).then(() => {
    console.info("\nDatabase Connection Established!");
  }).catch((err) => {
    console.log("\nDatabase Connection Failed!");
    console.error("Error Details: ", err);
    console.log("\n\nDatabase Connection Failed, Retrying . . .");
  })

//set up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/users", orderRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/orders", orderRoutes);
