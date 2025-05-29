import express from "express";
import billingRouter from "./billing.js";
const initRoutes = (app) => {
    app.use("/api/v1/billing", billingRouter);

    return app.use('/',(req,res)=>{
        res.send("Server is running");
        console.log("Server is running");
    })
}

export default initRoutes;
