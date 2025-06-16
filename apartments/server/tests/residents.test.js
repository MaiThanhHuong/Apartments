import request from "supertest";
import express from "express";
import residentsRouter from "../routes/residents.js";

const app = express();
app.use(express.json());
app.use("/residents", residentsRouter);

describe("Residents API", () => {
  it("GET /residents - should return residents list", async () => {
    const res = await request(app).get("/residents");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /residents/add - should add new resident", async () => {
    const newResident = {
      hoten: "Nguyen Van B",
      hokhau: 1,  // Bạn cần thay bằng id hokhau tồn tại trong db
      ngaysinh: "1991-01-01",
      gioitinh: "Nam",
      dantoc: "Kinh",
      cccd: "987654321",
      nghenghiep: "Kinh doanh",
      vaitro: "Thành viên"
    };

    const res = await request(app).post("/residents/add").send(newResident);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("insertId");
  });

  it("POST /residents/add - should add another resident", async () => {
    const anotherResident = {
      hoten: "Tran Thi C",
      hokhau: 1, // Thay id hokhau tương ứng
      ngaysinh: "1992-02-02",
      gioitinh: "Nữ",
      dantoc: "Kinh",
      cccd: "1122334455",
      nghenghiep: "Giáo viên",
      vaitro: "Thành viên"
    };

    const res = await request(app).post("/residents/add").send(anotherResident);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("insertId");
  });

  it("POST /residents/add - should add third resident", async () => {
    const thirdResident = {
      hoten: "Le Van D",
      hokhau: 1, // Thay id hokhau phù hợp
      ngaysinh: "1985-05-05",
      gioitinh: "Nam",
      dantoc: "Kinh",
      cccd: "9988776655",
      nghenghiep: "Kỹ sư",
      vaitro: "Thành viên"
    };

    const res = await request(app).post("/residents/add").send(thirdResident);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("insertId");
  });

//   it("PUT /residents/:id - should update resident", async () => {
//     const updatedData = {
//       hoten: "Nguyen Van C",
//       hokhau: 1, // Thay id hokhau
//       ngaysinh: "1992-02-02",
//       gioitinh: "Nam",
//       dantoc: "Kinh",
//       cccd: "1122334455",
//       nghenghiep: "Nông dân",
//       vaitro: "Thành viên",
//       trangthai: "Tạm trú"
//     };

//     // Thay id resident bạn muốn update
//     const vaitro = "Chủ hộ";

//     const res = await request(app).put(`/residents/${vaitro}`).send(updatedData);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Cập nhật thành công.");
//   });
});
