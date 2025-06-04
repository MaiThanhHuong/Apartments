import * as billingService from "../services/billing.js";
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { formatDatever2 } from '../ultis/formatDate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllBilling = async (req, res) => {
    try {
        const response = await billingService.getAllBillingServices();
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getBillingByIdv1 = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await billingService.getBillingByIdServicesv1(id);
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getBillingByIdv2 = async (req, res) => {
    try {
        const id = req.query.id;
        const response = await billingService.getBillingByIdServicesv2(id);
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const createBilling = async (req, res) => {
    try {
        // console.log(req.body);

        const { amount, category, dueDate, issueDate, resident, unit } = req.body;
        // console.log(req.body)
        if (!amount || !category || !dueDate || !issueDate || !resident || !unit) {
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.createBillingServices(req.body);
        // console.log(response);  
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json('Failed to create billing');
        }

    } catch (error) {
        return res.status(500).json({
            error: 1,
            message: 'failed to create billing controller' + error,
        });
    }
}

export const updateBillingv1 = async (req, res) => {
    try {
        const { id } = req.params;
        const { tenkhoanthu, loaikhoanthu, ngaytao, sotien, thoihan, phamvi } = req.body;
        if (!tenkhoanthu || !loaikhoanthu || !ngaytao || !sotien || !thoihan || !phamvi) {
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.updateBillingServicesv1(id, req.body);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json('Failed to update billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateBillingv2 = async (req, res) => {
    try {
        const { id } = req.query;
        const { tenkhoanthu, loaikhoanthu, ngaytao, sotien, thoihan, phamvi } = req.body;
        if (!tenkhoanthu || !loaikhoanthu || !ngaytao || !sotien || !thoihan || !phamvi) {
            return res.status(400).json({
                err: 1,
                message: "Missing required fields"
            });
        }
        const response = await billingService.updateBillingServicesv2(id, req.body);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json('Failed to update billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteBillingv1 = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.deleteBillingServicesv1(id);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json('Failed to delete billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteBillingv2 = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.deleteBillingServicesv2(id);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json('Failed to delete billing');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getNhanKhauHoKhau = async (req, res) => {
    try {
        const response = await billingService.getNhanKhauHoKhauServices();
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getinvoiceNumber = async (req, res) => {
    try {
        const response = await billingService.getinvoiceNumberServices();
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const payInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.payInvoiceServices(id);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getSearchInvoice = async (req, res) => {
    try {
        const { search } = req.query;
        // console.log(search);
        const response = await billingService.getSearchInvoiceServices(search);
        if (response.err === 0) {
            return res.status(200).json(response.response[0]);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const downloadInvoicePDF = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.downloadInvoicePDFServices(id);
        if (response.err === 0) {
            const invoice = response.response[0];
            if (!invoice || !invoice.length) {
                return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
            }
            const invoiceData = {
                invoiceNumber: invoice[0].invoiceNumber,
                unit: invoice[0].unit,
                resident: invoice[0].resident,
                issueDate: invoice[0].issueDate,
                dueDate: invoice[0].dueDate,
                amount: invoice[0].amount,
                status: invoice[0].status,
                category: invoice[0].category,
                paymentMethod: invoice[0].paymentMethod === '-' ? 'Tiền mặt' : invoice[0].paymentMethod,
                paymentDate: invoice[0].paymentDate
            }
            // Kiểm tra dữ liệu đầu vào
            if (!invoiceData.invoiceNumber || !invoiceData.unit) {
                return res.status(400).json({ message: "Dữ liệu hóa đơn không hợp lệ" });
            }
            try {            
                const fontPath = path.join(__dirname, '../fonts/Roboto-Regular.ttf');
                const fontPathBold = path.join(__dirname, '../fonts/Roboto-Bold.ttf');
                // Kiểm tra file font tồn tại
                if (!fs.existsSync(fontPath) || !fs.existsSync(fontPathBold)) {
                    return res.status(500).json({ message: "Font file not found" });
                }
                const doc = new PDFDocument();
                doc.registerFont('Roboto', fontPath);
                doc.registerFont('Roboto-Bold', fontPathBold);
                doc.font('Roboto');
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=invoice-${id}.pdf`);
                doc.pipe(res);
                // Header
                doc.fontSize(20).font('Roboto').text('NHÀ XUẤT BẢN\nHUYỀN THOẠI TNM', 50, 50, { align: 'left', lineGap: 2 });
                doc.fontSize(12).text(`Ngày ${formatDatever2(invoiceData.issueDate)}`, 400, 60, { align: 'left' });
                // Thông tin gửi cho ai và thanh toán cho ai
                doc.moveDown(2);
                doc.fontSize(12).font('Roboto-Bold').text('HÓA ĐƠN ĐƯỢC GỬI CHO:', 50, 120);
                doc.font('Roboto').text(`${invoiceData.resident}`, 50, 140);
                doc.text(`Căn hộ: ${invoiceData.unit}`, 50, 155);
                doc.font('Roboto-Bold').text('THANH TOÁN CHO:', 300, 120);
                doc.font('Roboto').text('Ngân hàng Vietcombank', 300, 140);
                doc.text('Tên tài khoản: Ban quản lý chung cư TNM', 300, 155);
                doc.text('Số tài khoản: 0123456789', 300, 170);
                // Bảng hạng mục
                doc.moveDown(2);
                const tableTop = 200;
                const item = invoiceData.category || 'Khoản thu';
                const amount = invoiceData.amount || 0;
                // Kẻ bảng
                doc.lineWidth(1);
                doc.moveTo(50, tableTop).lineTo(550, tableTop).stroke();
                doc.font('Roboto-Bold');
                doc.text('HẠNG MỤC', 55, tableTop + 5, { width: 200 });
                doc.text('SỐ LƯỢNG', 255, tableTop + 5, { width: 80, align: 'center' });
                doc.text('ĐƠN GIÁ', 335, tableTop + 5, { width: 100, align: 'center' });
                doc.text('TỔNG CỘNG', 435, tableTop + 5, { width: 100, align: 'center' });
                doc.font('Roboto');
                doc.moveTo(50, tableTop + 25).lineTo(550, tableTop + 25).stroke();
                // Dòng dữ liệu
                doc.text(item, 55, tableTop + 30, { width: 200 });
                doc.text('1', 255, tableTop + 30, { width: 80, align: 'center' });
                doc.text(`${amount.toLocaleString('vi-VN')}đ`, 335, tableTop + 30, { width: 100, align: 'center' });
                doc.text(`${amount.toLocaleString('vi-VN')}đ`, 435, tableTop + 30, { width: 100, align: 'center' });
                doc.moveTo(50, tableTop + 50).lineTo(550, tableTop + 50).stroke();
                // Tổng cộng
                doc.font('Roboto-Bold').text('Tổng cộng:', 335, tableTop + 60, { width: 100, align: 'center' });
                doc.font('Roboto-Bold').text(`${amount.toLocaleString('vi-VN')}đ`, 435, tableTop + 60, { width: 100, align: 'center' });
                // Cảm ơn
                doc.font('Roboto').fontSize(12).text('Xin cảm ơn!', 50, tableTop + 100);
                // Footer
                const footerY = 650; // hoặc 630, 670, ... tùy bố cục thực tế
                doc.fontSize(10).text('123 Đường ABC, Thành phố DEF', 50, footerY, { align: 'left' });
                doc.text('+84 912 345 678', 400, footerY, { align: 'left' });
                doc.text('truongngocmai@gmail.com', 400, footerY + 15, { align: 'left' });
                doc.end();
                // Không trả về gì nữa, stream sẽ tự kết thúc
            } catch (pdfErr) {
                console.error('PDF generation error:', pdfErr);
                if (!res.headersSent) {
                    return res.status(500).json({ message: 'Lỗi tạo file PDF', error: pdfErr.toString() });
                }
            }
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        console.error('Download PDF error:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Lỗi server', error: error.toString() });
        }
    }
}

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.deleteInvoiceServices(id);

        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await billingService.updateInvoiceServices(id, req.body);
        if (response.err === 0) {
            return res.status(200).json(response.msg);
        } else {
            return res.status(404).json(response.msg);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}   

