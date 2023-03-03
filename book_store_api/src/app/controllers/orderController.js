const voucherModel = require("../models/voucherModel");
const orderModel = require("../models/orderModel");
const orderDetailModel = require("../models/orderDetailModel");
const bookModel = require("../models/bookModel");

const OrderController = {
    
    getAllOrder: async (req, res) => {
        try {
            await orderModel
                .find()
                .populate({ path: "idUser" })
                .populate({ path: "idVoucher" })
                .then((data) => {
                    return res.status(200).json(data);
                });
        } catch (error) {
            return res.status(500).json({ msg: "getAllOrder: " + err });
        }
    },


    getAllOrderByStatus: async (req, res) => {
        try {
            await orderModel
                .find({ status: req.query.status })
                .populate({ path: "idUser" })
                .populate({ path: "idVoucher" })
                .then((data) => {
                    return res.status(200).json(data);
                });
        } catch (error) {
            return res.status(500).json({ msg: "getAllOrderByStatus: " + err });
        }
    },

    getAllOrderOfUser: async (req, res) => {
        try {
            await orderModel
                .find({ idUser: req.query.iduser })
                .populate({ path: "idUser" })
                .populate({ path: "idVoucher" })
                .then((data) => {
                    return res.status(200).json(data);
                });
        } catch (error) {
            return res.status(500).json({ msg: "getAllOrderOfUser: " + err });
        }
    },
    //4. Khách hàng tạo đơn hàng
    createOrder: async (req, res) => {
        try {
            const { idUser, total, idVoucher,recipient, phone, address, items, note } = req.body;
            const d = new Date();
            const newOrder = new orderModel();
            newOrder.idUser = idUser;

            newOrder.idVoucher = idVoucher;
            // if(idVoucher!=""){
            // }else{
            //     newOrder.idVoucher = "NO";
            // }`
            newOrder.total = total;
            newOrder.recipient = recipient;
            newOrder.phone = phone;
            newOrder.address = address;
            newOrder.date =
                d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
            newOrder.note = note;
            newOrder.status = 1;
            // console.log(newOrder.idUser, newOrder.total, newOrder.idVoucher,newOrder.recipient, newOrder.phone, newOrder.address, items, newOrder.note );
            //lưu order vào db
            newOrder.save(function (err, rs) {
                if (err) {
                    console.log("err",err);
                    return res.status(400).json({ msg: "Tạo đơn hàng lỗi" });
                } else {
                    //trừ số lượng của voucher
                    voucherModel.findById(idVoucher).then((data) => {
                        data.qty -= 1;
                        data.save();
                    });
                    //get idOrder
                    const idOrder = rs._id;
                    //save as to order detail
                    const newItems = []
                    items.forEach((item) => {
                        const newItem = new orderDetailModel();
                        newItem.idOrder = idOrder;
                        newItem.idBook = item.id;
                        newItem.amount = item.amount;
                        newItem.price = item.price;
                        newItem.total = item.total;

                        newItems.push(newItem);
                        bookModel.findById(item.id).then((data) => {
                            console.log(data.qty);
                            data.qty -= item.amount;
                            data.save();
                        });

                    });
                    let hasError = false;
                    newItems.forEach((item)=>{
                        console.log(item);
                        item.save((err, rs) => {
                        if (err) {
                            hasError = true;
                        }
                    });
                    });
                    if (hasError) {
                        return res.status(403).json({ msg: "Thêm chi tiết đơn hàng lỗi!" });
                    }
                    
                }
            });
            return res.status(200).json({ msg: "Đặt hàng hoàn tất" });
        } catch (error) {
            return res.status(500).json({ msg: "createOrder: " + error });
        }
    },
    //5. admin cập nhật status
    //-xử lý đơn 1->2
    //-giao hàng 2->3
    adminUpdateStatus: async (req, res) => {
        try {
            const idOrder = req.params.id;
            const status = req.query.status;

            if (status == 2) {
                await orderModel
                    .updateOne({ _id: idOrder }, { status: status })
                    .then(() => {
                        return res
                            .status(200)
                            .json({ msg: "Xác nhận đơn hàng thành công" });
                    });
            } else if (status == 3) {
                await orderModel
                    .updateOne({ _id: idOrder }, { status: status })
                    .then(() => {
                        return res.status(200).json({
                            msg: "Xử lý đơn hàng thành công, đơn hàng sẽ được chuyển đến bộ phận giao hàng",
                        });
                    });
            }
        } catch (error) {
            return res.status(500).json({ msg: "adminUpdateStatus: " + error });
        }
    },
    //6.Khách hàng tương tác với đơn hàng
    //-Khách hàng xác nhận đơn hàng 3->4
    //-Khách hàng hủy đơn hàng ->0
    userUpdateStatus: async (req, res) => {
        try {
            const idOrder = req.params.id;
            const status = req.query.status;
            if (status == 4) {
                await orderModel
                    .updateOne({ _id: idOrder }, { status: status })
                    .then(() => {
                        return res
                            .status(200)
                            .json({ msg: "Nhận đơn hàng thành công" });
                    });
            }
            //Khi hủy đơn hàng, trả lại số lượng cho kho
            else if (status == 0) {
                const preStatus = await orderModel
                    .findById(idOrder)
                    .then((data) => data.status);
                if (preStatus == 1) {
                    await orderModel
                        .updateOne({ _id: idOrder }, { status: status })
                        .then(() => {
                            orderDetailModel
                                .find({ idOrder: idOrder })
                                .then((orderItems) => {
                                    orderItems.forEach((item) => {
                                        bookModel
                                            .findById(item.idBook)
                                            .then((b) => {
                                                b.qty += item.amount;
                                                b.save();
                                            });
                                    });
                                });
                        });
                    return res
                        .status(200)
                        .json({ msg: "Hủy đơn hàng thành công" });
                } else if (preStatus != 1) {
                    return res
                        .status(400)
                        .json({ msg: "Không thể hủy đơn hàng" });
                }
            }
        } catch (error) {
            return res.status(500).json({ msg: "userUpdateStatus: " + err });
        }
    },

    getAllOrderDetailOfOrderId: async (req, res) => {
        try {
            await orderDetailModel
                .find({ idOrder: req.params.id })
                .populate("idBook")
                .then((data) => {
                    return res.status(200).json(data);
                });
        } catch (error) {
            return res
                .status(500)
                .json({ msg: "getAllOrderDetailOfOrderId: " + err });
        }
    },
};
module.exports = OrderController;
