const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRouter");
const parcelRoutes = require("./routers/parcelRoutes");
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
app.use(cors({
  origin:["https://safe-courier-phillip.netlify.app"],
  credentials:true
}));

//connect to mongoDB
mongoose.connect(
  process.env.DB_URL_DEV,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

//set up routes
app.use("/auth", userRoutes);
app.use("/", parcelRoutes);