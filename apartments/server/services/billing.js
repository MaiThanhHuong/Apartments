import { db } from "../server.js";

export const getAllBillingServices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query("SELECT * FROM khoanthu");
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getBillingByIdServicesv1 = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query("SELECT * FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getBillingByIdServicesv2 = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query("SELECT * FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createBillingServices = (data) => new Promise(async (resolve, reject) => {
    try {
        if (data.unit === 'ALL') {
            const { amount, category, dueDate, issueDate } = data;

            // 1. Lấy tất cả các hộ (hoặc chủ hộ)
            const [hokhauRows] = await db.query(`
                SELECT hk.id, nk.hoten AS chuho
                FROM hokhau hk
                JOIN nhankhau nk ON hk.id = nk.hokhau
                WHERE nk.vaitro = 'Chủ hộ'
            `);

            // 2. Lặp qua từng hộ, mỗi hộ tạo 1 khoản thu và 1 hóa đơn
            for (const hk of hokhauRows) {
                // a. Insert khoản thu mới cho từng hộ
                const [responseKhoanThu] = await db.query(
                    "INSERT INTO khoanthu (tenkhoanthu, loaikhoanthu, ngaytao, sotien, thoihan, phamvi) VALUES (?, ?, ?, ?, ?, ?)",
                    [category, category, issueDate, amount, dueDate, 'CUSTOM']
                );
                const khoanthuId = responseKhoanThu.insertId;

                // b. Insert hóa đơn cho hộ này
                await db.query(
                    "INSERT INTO noptien (ngaythu, sotien, nguoinop, khoanthu, hokhau) VALUES (?, ?, ?, ?, ?)",
                    [null, 0, hk.chuho, khoanthuId, hk.id]
                );
            }

            resolve({
                err: 0,
                msg: `Tạo ${hokhauRows.length} khoản thu và hóa đơn cho ${hokhauRows.length} hộ thành công!`,
                response: { inserted: hokhauRows.length }
            });
        } else {
            const { amount, category, dueDate, issueDate, resident, unit } = data;
            const [hokhauRow] = await db.query("SELECT id FROM hokhau WHERE sonha = ?", [unit]);
            if (!hokhauRow.length) return resolve({ err: 1, msg: `Không tìm thấy hộ khẩu số ${unit}` });
            const hokhauId = hokhauRow[0].id;

            const response1 = await db.query("INSERT INTO khoanthu (tenkhoanthu, loaikhoanthu, ngaytao, sotien, thoihan, phamvi) VALUES (?, ?, ?, ?, ?, ?)", [category, category, issueDate, amount, dueDate, 'CUSTOM']);
            const response2 = await db.query("INSERT INTO noptien (ngaythu, sotien, nguoinop, khoanthu, hokhau) VALUES (?, ?, ?, ?, ?)", [null, 0, resident, response1[0].insertId, hokhauId]);
            resolve({
                err: response1 && response2 ? 0 : 1,
                msg: response1 && response2 ? "Billing services created successfully" : "Failed to create billing services",
                response: response1 && response2
            });

        }
    } catch (error) {
        reject(error);
    }
});

export const updateBillingServicesv1 = (id, data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query("UPDATE khoanthu SET tenkhoanthu = ?, loaikhoanthu = ?, ngaytao = ?, sotien = ?, thoihan = ?, phamvi = ? WHERE id = ?", [data.tenkhoanthu, data.loaikhoanthu, data.ngaytao, data.sotien, data.thoihan, data.phamvi, id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services updated successfully" : "Failed to update billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const updateBillingServicesv2 = (id, data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query("UPDATE khoanthu SET tenkhoanthu = ?, loaikhoanthu = ?, ngaytao = ?, sotien = ?, thoihan = ?, phamvi = ? WHERE id = ?", [data.tenkhoanthu, data.loaikhoanthu, data.ngaytao, data.sotien, data.thoihan, data.phamvi, id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services updated successfully" : "Failed to update billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const deleteBillingServicesv1 = (id) => new Promise(async (resolve, reject) => {
    try {
        await db.query("DELETE FROM noptien WHERE khoanthu = ?", [id]);
        const response = await db.query("DELETE FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services deleted successfully" : "Failed to delete billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const deleteBillingServicesv2 = (id) => new Promise(async (resolve, reject) => {
    try {
        await db.query("DELETE FROM noptien WHERE khoanthu = ?", [id]);
        const response = await db.query("DELETE FROM khoanthu WHERE id = ?", [id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services deleted successfully" : "Failed to delete billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getNhanKhauHoKhauServices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query(`
            SELECT nhankhau.*, hokhau.sonha, hokhau.duong, hokhau.phuong, hokhau.quan
            FROM nhankhau
            JOIN hokhau ON nhankhau.hokhau = hokhau.id
          `);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getinvoiceNumberServices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.query(`
            SELECT
            noptien.id,
            CONCAT('HD-2025-', noptien.id) AS invoiceNumber,
            hokhau.sonha AS unit,
            nhankhau.hoten AS resident,
            khoanthu.ngaytao AS issueDate,
            khoanthu.thoihan AS dueDate,
            khoanthu.sotien AS amount,
            CASE
                WHEN noptien.sotien >= khoanthu.sotien THEN 'Đã thanh toán'
                WHEN CURDATE() > khoanthu.thoihan THEN 'Quá hạn'
                ELSE 'Chờ thanh toán'
            END AS status,
            khoanthu.loaikhoanthu AS category,
            '-' AS paymentMethod,
            noptien.ngaythu AS paymentDate
            FROM noptien
            JOIN khoanthu ON noptien.khoanthu = khoanthu.id
            JOIN hokhau ON noptien.hokhau = hokhau.id
            JOIN nhankhau ON hokhau.id = nhankhau.hokhau AND nhankhau.vaitro = 'Chủ hộ'
            ORDER BY noptien.id ASC
;
          `);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});

const getInvoiceStatus = (invoice) => {
    // Đã thanh toán nếu số tiền đã nộp >= số tiền phải nộp
    if (invoice.sotien >= invoice.khoanthuAmount) return "Đã thanh toán";
    // Quá hạn nếu chưa nộp đủ và quá hạn
    if (new Date() > new Date(invoice.dueDate)) return "Quá hạn";
    // Còn lại là chờ thanh toán
    return "Chờ thanh toán";
};

export const payInvoiceServices = (id) => new Promise(async (resolve, reject) => {
    try {
        const [[row]] = await db.query(`
            SELECT khoanthu.sotien
            FROM khoanthu
            JOIN noptien ON khoanthu.id = noptien.khoanthu
            WHERE noptien.id = ?
          `, [id]);
        if (!row) return resolve({ err: 1, msg: "Không tìm thấy hóa đơn" });
        const response = await db.query("UPDATE noptien SET noptien.sotien = ?, noptien.ngaythu = CONVERT_TZ(NOW(), '+00:00', '+07:00')  WHERE noptien.id = ?", [row.sotien, id]);
        if (response.affectedRows === 0) return resolve({ err: 1, msg: "Ghi nhận thanh toán thất bại" });
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ghi nhận thanh toán thành công" : "Ghi nhận thanh toán thất bại",
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getSearchInvoiceServices = (search) => new Promise(async (resolve, reject) => {
    try {
        let id = search;
        // Nếu search là dạng HD-2025-13 thì tách lấy số 13
        const idMatch = search.match(/HD-2025-(\d+)/);
        if (idMatch) id = idMatch[1];
        // console.log(id);
        if (!id) return resolve({ err: 1, msg: "Mã hóa đơn không hợp lệ" });
        const response = await db.query(`
             SELECT
            noptien.id,
            CONCAT('HD-2025-', noptien.id) AS invoiceNumber,
            hokhau.sonha AS unit,
            nhankhau.hoten AS resident,
            khoanthu.ngaytao AS issueDate,
            khoanthu.thoihan AS dueDate,
            khoanthu.sotien AS amount,
            CASE
                WHEN noptien.sotien >= khoanthu.sotien THEN 'Đã thanh toán'
                WHEN CURDATE() > khoanthu.thoihan THEN 'Quá hạn'
                ELSE 'Chờ thanh toán'
            END AS status,
            khoanthu.loaikhoanthu AS category,
            '-' AS paymentMethod,
            noptien.ngaythu AS paymentDate
            FROM noptien
            JOIN khoanthu ON noptien.khoanthu = khoanthu.id
            JOIN hokhau ON noptien.hokhau = hokhau.id
            JOIN nhankhau ON hokhau.id = nhankhau.hokhau AND nhankhau.vaitro = 'Chủ hộ'
            WHERE noptien.id = ?
        `, [id]);
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Billing services fetched successfully" : "Failed to fetch billing services",
            response
        });
    } catch (error) {
        reject(error);
    }
});