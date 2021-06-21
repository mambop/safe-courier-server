const router = require("express").Router();
const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//create parcel order
router.post("/", auth, async (req, res) => {
  try {
    const { product, quantity, pickup } = req.body;
    const newParcel = new Parcel({ product, quantity, pickup });
    const savedParcel = await newParcel.save();
    res.json(savedParcel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// get all parcel orders
router.get("/parcels", auth, async (req, res) => {
  try {
    const getParcels = await Parcel.find();
    res.json(getParcels);


  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// get specific parcel order
router.get("/parcels/:parcelId", auth, async (req, res) => {
  try {
    const parcels = await Parcel.findById(req.params.parcelId);
    res.json(parcels);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// cancel parcel order
router.delete("/parcels/:parcelId/cancel", auth, async (req, res) => {
  try {
    const parcels = await Parcel.findByIdAndDelete(req.params.parcelId);
    res.json({
      message: 'Cancelled Order',
      order: parcels
    });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// cancle parcel order
module.exports = router;