const router = require("express").Router();
const Admin = require("../models/adminModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Admin signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "please enter all fields" });
    }
    //check for existing user in Db
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(400).json({ errorMessage: "email already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save admin to DB
    const newAdmin = new Admin({email, passwordHash });
    const savedAdmin = await newAdmin.save();

    //sign the token
    const token = jwt.sign(
      {
        user:savedAdmin._id
      },
      process.env.JWT_SECRET_KEY
    );

    // send token to HTTP-only cookie
    res.cookie("cookieToken", token, { httpOnly: true }).send();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Admin login
router.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password)
      return res.status(400).json({ errorMessage: "please enter all fields" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ errorMessage: "wrong email or password" });

    const passwordCorrect = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    //sign the token
    const token = jwt.sign(
      {
        user: admin._id
      },
      process.env.JWT_SECRET_KEY
    );
    // send token to HTTP-only cookie
    res.cookie("cookieToken", token, { httpOnly: true }).send();

  } catch (err) {
    res.status(500).json({ message: err.message });

  }
});

//get all orders 
router.get("/",auth, async (req, res) => {

  try {
    const getOrders = await Order.find()
      .populate('user', 'name')
      .exec()
    res.json(getOrders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//change status of order by only Admin
router.put("/orders/:orderId/status",auth, async (req, res) => {
  try {
    const status = await Order.findOneAndUpdate({
      _id: req.params.orderId
    },
      {
        status: req.body.status
      },
      {
        new: true,
      });
    return res.json(status);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//change present location of order by only Admin
router.put("/orders/:orderId/presentLocation",auth, async (req, res) => {
  try {
    const presentLoc = await Order.findOneAndUpdate({
      _id: req.params.orderId
    },
      {
        presentLoc: req.body.presentLoc
      },
      {
        new: true,
      });
    return res.status(200).json(presentLoc);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;