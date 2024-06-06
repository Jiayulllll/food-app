import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema({
  postcode: {
    type: String,
    required: true,
    unique: true,
  },
  isEligible: {
    type: Boolean,
    required: true,
  },
});

const deliveryZoneModel =
  mongoose.models.deliveryZone ||
  mongoose.model("deliveryZone", deliveryZoneSchema);
export default deliveryZoneModel;
