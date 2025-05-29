import { db } from "../server.js";

export const getAllBillingServices =  () => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("SELECT * FROM khoanthu");
        resolve({
            err : response ? 0 : 1,
            msg : response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response 
        });
    }catch(error){
        reject(error);
    }
});

export const getBillingByIdServicesv1 = (id) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("SELECT * FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err : response ? 0 : 1,
            msg : response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response 
        });
    }catch(error){  
        reject(error);
    }
});

export const getBillingByIdServicesv2 = (id) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("SELECT * FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err : response ? 0 : 1,
            msg : response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response 
        }); 
    }catch(error){
        reject(error);
    }
});

export const createBillingServices = (data) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("INSERT INTO khoanthu (tenkhoanthu, loaikhoanthu, ngaytao,sotien,thoihan) VALUES (?, ?, ?, ?,?)", [data.tenkhoanthu, data.loaikhoanthu, data.ngaytao,data.sotien,data.thoihan]);
        resolve({
            err : response ? 0 : 1, 
            msg : response ? "Billing services created successfully" : "Failed to create billing services",
            response 
        });
    }catch(error){
        reject(error);
    }
});

export const updateBillingServicesv1 = (id, data) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("UPDATE khoanthu SET tenkhoanthu = ?, loaikhoanthu = ?, ngaytao = ?, sotien = ?, thoihan = ? WHERE id = ?", [data.tenkhoanthu, data.loaikhoanthu, data.ngaytao,data.sotien,data.thoihan,id]);
        resolve({
            err : response ? 0 : 1, 
            msg : response ? "Billing services updated successfully" : "Failed to update billing services",
            response 
        });
    }catch(error){
        reject(error);
    }
});

export const updateBillingServicesv2 = (id, data) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.query("UPDATE khoanthu SET tenkhoanthu = ?, loaikhoanthu = ?, ngaytao = ?, sotien = ?, thoihan = ? WHERE id = ?", [data.tenkhoanthu, data.loaikhoanthu, data.ngaytao,data.sotien,data.thoihan,id]);
        resolve({
            err : response ? 0 : 1, 
            msg : response ? "Billing services updated successfully" : "Failed to update billing services",
            response 
        });
    }catch(error){
        reject(error);
    }
});    

export const deleteBillingServicesv1 = (id) => new Promise(async (resolve, reject) => {
    try{
        await db.query("DELETE FROM noptien WHERE khoanthu = ?", [id]);
        const response = await db.query("DELETE FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err : response ? 0 : 1,
            msg : response ? "Billing services deleted successfully" : "Failed to delete billing services",
            response 
        });
    }catch(error){
        reject(error);
    }   
}); 

export const deleteBillingServicesv2 = (id) => new Promise(async (resolve, reject) => {
    try{
        await db.query("DELETE FROM noptien WHERE khoanthu = ?", [id]);
        const response = await db.query("DELETE FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err : response ? 0 : 1,
            msg : response ? "Billing services deleted successfully" : "Failed to delete billing services",
            response 
        });
    }catch(error){
        reject(error);
    }
});



