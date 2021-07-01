const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "please enter all fields" });
    }
    //check for existing user in Db
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "email already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save new user to DB
    const newUser = new User({email, passwordHash });
    const savedUser = await newUser.save();

    //sign the token
    const token = jwt.sign(
      {
        user: savedUser._id
      },
      process.env.JWT_SECRET_KEY
    );

    // send token to HTTP-only cookie
    res.cookie("cookieToken", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// login
router.post("/login",async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password)
      return res.status(400).json({ errorMessage: "please enter all fields" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "wrong email or password" });

    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    //sign the token
    const token = jwt.sign(
      {
        user: existingUser._id
      },
      process.env.JWT_SECRET_KEY
    );
    // send token to HTTP-only cookie
    res.cookie("cookieToken", token, { httpOnly: true }).send();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// logout
router.get("/logout", (req, res) => {
  // send token to HTTP-only cookie
  res.cookie("cookieToken", "", { httpOnly: true, expires: new Date(0) }).send();
})


// validate loggedin user
router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.cookieToken;
    if (!token)
      return res.json(false);

    //verify loggedin token 
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.send(true);
  }
  catch (err) {
    // res.json(false);
    res.json({Message:"err"})
  }
})

module.exports = router;
