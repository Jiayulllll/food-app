import express from "express";
import {
  checkPostcode,
  addPostcode,
  listPostcodes,
} from "../controllers/deliveryZoneController.js";

const deliveryZoneRouter = express.Router();
deliveryZoneRouter.post("/check", checkPostcode);
deliveryZoneRouter.post("/add-postcode", addPostcode);
deliveryZoneRouter.get("/list-postcode", listPostcodes);

export default deliveryZoneRouter;
