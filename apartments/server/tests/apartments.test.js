import request from 'supertest';
import express from 'express';
import apartmentsRouter from '../routes/apartments.js';
import { db } from '../db.js';



// Tạo app Express giả lập để test router
const app = express();
app.use(express.json());
app.use('/apartments', apartmentsRouter);

// Mock dữ liệu mẫu
const mockApartment = {
    id: '123',
    sonha: '12',
    duong: 'Nguyen Trai',
    phuong: 'Ben Thanh',
    quan: '1',
    ngaylamhokhau: '2023-01-01'
};

describe('Apartments API', () => {

    // ✅ GET /
    it('GET /apartments - should return list of apartments', async () => {
        const res = await request(app).get('/apartments');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // ✅ POST /add
    it('POST /apartments/add - should add new apartment', async () => {
        const res = await request(app)
            .post('/apartments/add')
            .send(mockApartment);
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Thêm hộ khẩu thành công');
        expect(res.body).toHaveProperty('insertId');
    });

    // ✅ PUT /:id
    it('PUT /apartments/:id - should update apartment', async () => {
        const res = await request(app)
            .put(`/apartments/${mockApartment.id}`)
            .send({
                sonha: '15',
                duong: 'Le Lai',
                phuong: 'Pham Ngu Lao',
                quan: '1',
                ngaylamhokhau: '2024-05-01'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Cập nhật thành công.');
    });

    // ✅ DELETE /:id
    it('DELETE /apartments/:id - should delete apartment', async () => {
        const res = await request(app).delete(`/apartments/${mockApartment.id}`);
        expect([200, 404]).toContain(res.statusCode); 
        expect(res.body).toHaveProperty('message');
    });

});
