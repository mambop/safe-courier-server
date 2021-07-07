const router = require("express").Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");



// get all orders
router.get("/",auth,async (req, res) => {
  try {
    const getAllParcels = await Order.find()
      .populate('createdBy', 'email')

    res.json(getAllParcels);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get specific order
router.get("/:orderId", async (req, res) => {
  try {
    const getOneOrder = await Order.findById(req.params.orderId)
   
    res.json(getOneOrder);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all orders for one user
router.get("/:userId/orders",auth, async (req, res) => {
  try {

    const userOrders = await Order.find({createdBy:req.userId});
   
    res.json(userOrders);

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
});

// cancel order
router.delete("/cancel/:orderId",auth, async (req, res) => {
  try {
    const id =req.params.orderId
    await Order.findByIdAndRemove(id).exec();
     res.send("deleted");

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//create order
  router.post("/",auth, async (req, res) => {

  try {
    _id = req.params.userId;
    const newOrder = new Order({
      createdBy: req.userId,
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
router.put("/destination",auth, async (req, res) => {
  const newDestination  = req.body.destination
  const id = req.body.id
  try {
    await Order.findById(id, (err, updateDestination) =>{
      updateDestination.destination = newDestination
      updateDestination.save();
      res.send("Updated")
    })

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;