const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderDetailSchema = new Schema({
  idOrder: {
    type: Schema.Types.ObjectId,
    ref: "Orders",
  },
  idBook: {
    type: Schema.Types.ObjectId,
    ref: "Books",
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  total: {
    type: Number,
  },
});
module.exports = mongoose.model("OrderDetails", OrderDetailSchema);
