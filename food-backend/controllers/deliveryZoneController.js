import deliveryZoneModel from "../models/deliveryZoneModel.js";

const checkPostcode = async (req, res) => {
  try {
    const { postcode } = req.body;
    const zone = await deliveryZoneModel.findOne({ postcode });
    if (zone) {
      res.json({ isEligible: zone.isEligible });
    } else {
      res.json({ success: false, message: "Postcode not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const addPostcode = async (req, res) => {
  const { postcode, isEligible } = req.body;
  try {
    // Check if the postcode already exists
    const existingZone = await deliveryZoneModel.findOne({ postcode });
    if (existingZone) {
      return res.json({ success: false, message: "Postcode already exists" });
    }

    // Create new postcode entry
    const newZone = new deliveryZoneModel({
      postcode: req.body.postcode,
      isEligible: req.body.isEligible,
    });

    await newZone.save();
    res.json({ success: true, message: "Postcode added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding postcode" });
  }
};

const listPostcodes = async (req, res) => {
  try {
    const zones = await deliveryZoneModel.find({});
    res.json(zones);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error retrieving postcodes" });
  }
};

const removePostcode = async (req, res) => {
  const { postcode } = req.body;

  try {
    const result = await deliveryZoneModel.findOneAndDelete({ postcode });

    if (result) {
      return res.json({
        success: true,
        message: "Postcode removed successfully",
      });
    } else {
      return res.json({ success: false, message: "Postcode not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error removing postcode" });
  }
};

export { checkPostcode, addPostcode, listPostcodes, removePostcode };
