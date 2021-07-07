const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRouter");
const orderRoutes = require("./routers/orderRoutes");
const adminRoutes = require("./routers/adminRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

dotenv.config();

//setup server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.json());
app.use(cookieParser());

// allow client make req,res & save cookie 
// app.use(cors({
//   origin:["https://safe-courier-phillip.netlify.app","http://localhost:3000"],
//   credentials:true
// }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://safe-courier-phillip.netlify.app');
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  next();
});

// const origin = process.env.NODE_ENV === "development" 
//   ? "http://localhost:3000" 
//   : "http://example.com"

// app.use(
//   cors({
//     credentials: true,
//     origin
//   }),


// connect to mongoDB
function establishedConnectin(){
  console.log("\nEstablishing Database Connection . . . ");
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
      establishedConnectin();
    });
  }
   
    establishedConnectin();
// mongoose.connect(
//   process.env.DB_URL_LOC,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true

//   }).then(() => {
//     console.info("\nDatabase Connection Established!");
//   }).catch((err) => {
//     console.log("\nDatabase Connection Failed!");
//     console.error("Error Details: ", err);
//     console.log("\n\nDatabase Connection Failed, Retrying . . .");
//   })

//set up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/users", orderRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/orders", orderRoutes);

