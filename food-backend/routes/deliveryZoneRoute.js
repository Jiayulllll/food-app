import express from "express";
import {
  checkPostcode,
  addPostcode,
  listPostcodes,
  removePostcode,
} from "../controllers/deliveryZoneController.js";

const deliveryZoneRouter = express.Router();
deliveryZoneRouter.post("/check", checkPostcode);
deliveryZoneRouter.post("/add-postcode", addPostcode);
deliveryZoneRouter.get("/list-postcode", listPostcodes);
deliveryZoneRouter.delete("/remove-postcode", removePostcode);

export default deliveryZoneRouter;
