import express from "express";
import {
  checkPostcode,
  addPostcode,
} from "../controllers/deliveryZoneController.js";

const deliveryZoneRouter = express.Router();
deliveryZoneRouter.post("/check", checkPostcode);
deliveryZoneRouter.post("/add-postcode", addPostcode);

export default deliveryZoneRouter;
