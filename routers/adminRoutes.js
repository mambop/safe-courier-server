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



//change present location of order
router.put("/presentLoc",auth, async (req, res) => {
  const newPresentLoc  = req.body.presentLoc
  const id = req.body.id
  try {
    await Order.findById(id, (err, updatePresentLoc) =>{
      updatePresentLoc.presentLoc = newPresentLoc
      updatePresentLoc.save();
      res.send("Updated")
    })

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


//change status of order
router.put("/status",auth, async (req, res) => {
  const newStatus  = req.body.status
  const id = req.body.id
  try {
    await Order.findById(id, (err, updateStatus) =>{
      updateStatus.status = newStatus
      updateStatus.save();
      res.send("Updated")
    })

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;