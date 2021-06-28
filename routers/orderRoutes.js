const router = require("express").Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");



// get all orders
router.get("/",auth,async (req, res) => {
  try {
    const getAllParcels = await Order.find()
      .populate('user', 'email')
      .exec()
    res.json(getAllParcels);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get specific order
router.get("/:orderId", async (req, res) => {
  try {
    const getOneOrder = await Order.findById(req.params.orderId)
      .populate('user', 'email')
      .exec()
    res.json(getOneOrder);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all orders for one user
router.get("/:userId/orders",auth, async (req, res) => {
  try {

    const singleUser = await Order.find({ user: req.params.userId })
      .populate('user', 'email')
      .exec()
    res.json(singleUser);

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
});

// cancel order
router.delete("/:orderId/cancel",auth, async (req, res) => {
  try {
    const orders = await Order.findByIdAndDelete(req.params.orderId)
      .populate('user', 'email')
      .exec()
    res.json({
      message: 'Cancelled Order',
      order: orders
    });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//create order
router.post("/:userId/orders",auth, async (req, res) => {
  // router.post("/",auth, async (req, res) => {

  try {
    _id = req.params.userId;
    const newOrder = new Order({
      user: _id,
      name:req.body.name,
      contact: req.body.contact,
      order: req.body.order,
      pickup: req.body.pickup,
      destination: req.body.destination
    });
    const savedOrder = await newOrder.save()

    res.json(savedOrder);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//change destination of order
router.put("/:orderId/destination",auth, async (req, res) => {
  try {
    await Order.findOneAndUpdate({
      _id: req.params.orderId
    },
      {
        destination: req.body.destination
      })
    res.json({
      message: 'Update Successful',
    });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;