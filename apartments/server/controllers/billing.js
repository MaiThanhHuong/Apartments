import * as billingService from "../services/billing.js";

export const getAllBilling = async (req, res) => {
    try{
        const response = await billingService.getAllBillingServices();
        if(response.err === 0){
            return res.status(200).json(response.response[0]);
        }else{
            return res.status(404).json(response.msg);
        }
    } catch (error) {   
        return res.status(500).json(error);
    }
};

export const getBillingByIdv1 = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await billingService.getBillingByIdServicesv1(id);
        if(response.err === 0){
            return res.status(200).json(response.response[0]);
        }else{
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getBillingByIdv2 = async (req, res) => {
    try{
        const id = req.query.id;
        const response = await billingService.getBillingByIdServicesv2(id);
        if(response.err === 0){
            return res.status(200).json(response.response[0]);
        }else{
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const createBilling = async (req, res) => {
    try{
        // console.log(req.body);

        const {tenkhoanthu, loaikhoanthu, ngaytao,sotien,thoihan} = req.body;
        if(!tenkhoanthu || !loaikhoanthu || !ngaytao || !sotien || !thoihan){
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.createBillingServices(req.body);
        // console.log(response);
        if(response.err === 0){
            return res.status(200).json(response.msg);
        }else{
            return res.status(404).json('Failed to create billing');
        }

    } catch (error) {
        return res.status(500).json({
            error : 1,
            message : 'failed to create billing controller' + error,
        });
    }
}

export const updateBillingv1 = async (req, res) => {
    try{
        const {id} = req.params;
        const {tenkhoanthu, loaikhoanthu, ngaytao,sotien,thoihan} = req.body;
        if(!tenkhoanthu || !loaikhoanthu || !ngaytao || !sotien || !thoihan){
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.updateBillingServicesv1(id, req.body);
        if(response.err === 0){
            return res.status(200).json(response.msg);
        }else{
            return res.status(404).json('Failed to update billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}   

export const updateBillingv2 = async (req, res) => {
    try{
        const {id} = req.query; 
        const {tenkhoanthu, loaikhoanthu, ngaytao,sotien,thoihan} = req.body;
        if(!tenkhoanthu || !loaikhoanthu || !ngaytao || !sotien || !thoihan){
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.updateBillingServicesv2(id, req.body);
        if(response.err === 0){
            return res.status(200).json(response.msg);
        }else{
            return res.status(404).json('Failed to update billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}   

export const deleteBillingv1   = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await billingService.deleteBillingServicesv1(id);
        if(response.err === 0){
            return res.status(200).json(response.msg);
        }else{
            return res.status(404).json('Failed to delete billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteBillingv2 = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await billingService.deleteBillingServicesv2(id);
        if(response.err === 0){
            return res.status(200).json(response.msg);
        }else{
            return res.status(404).json('Failed to delete billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
