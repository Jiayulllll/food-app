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
      postcode,
      isEligible,
    });

    await newZone.save();
    res.json({ success: true, message: "Postcode added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding postcode" });
  }
};

export { checkPostcode, addPostcode };
