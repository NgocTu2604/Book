const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  total: {
    //tổng tiền của hóa đơn sau khi đã dùng mã giảm giá
    type: Number,
  },
  date: {
    type: String,
  },
  note: {
    type: String,
  },
  recipient:{
    type: String,
  },
  phone:{
    type: String,
  },
  address:{
    type: String,
  },
  idVoucher: {
    required:false,
    type: Schema.Types.ObjectId,
    ref: "Vouchers",
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  status: {
    //0: đã hủy
    //1: đang xử lý -> nhấn duyệt
    //2: đã xử lý -> nhấn giao hàng
    //3: đang giao -> khách hàng nhấn nút xác nhận
    //4: hoàn thành
    type: Number,
  },
});
module.exports = mongoose.model("Orders", orderSchema);
