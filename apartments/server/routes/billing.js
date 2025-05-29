import express from "express";
import * as billingController from "../controllers/billing.js";

const billingRouter = express.Router();

billingRouter.get("/get-all", billingController.getAllBilling);
billingRouter.get("/get-by-id/:id", billingController.getBillingByIdv1);
billingRouter.get("/get-by-id", billingController.getBillingByIdv2);

billingRouter.post("/create", billingController.createBilling); 


billingRouter.put("/update-by-id/:id", billingController.updateBillingv1);
billingRouter.put("/update-by-id", billingController.updateBillingv2);

billingRouter.delete("/delete-by-id/:id", billingController.deleteBillingv1);
billingRouter.delete("/delete-by-id", billingController.deleteBillingv2);


export default billingRouter;
