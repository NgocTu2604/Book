import React, {useContext,useState } from "react";
import Header from "../UI/Header/Header";
import CartContext from "../../Store/CartContext";
import {API} from "../../constant.js"

function Payment(props) {
    const cartCtx = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    console.log(cartCtx);
    let totalMoney = 0;
    if(cartCtx.voucher)
    {
        totalMoney = cartCtx.totalAmount + 15000 - cartCtx.voucher.reduce
    }
    else{
        totalMoney = cartCtx.totalAmount + 15000
    }
    function convertToVnd(amount) {
        const parts = String(amount).split('.');
        let intPart = parts[0];
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        if (parts.length > 1) {
          const decPart = parts[1].substring(0, 2).padEnd(2, '0');
          return `${intPart} VNĐ${decPart}`;
        } else {
          return `${intPart} VNĐ`;
        }
      }

    const handleBooking = async(e) =>{
        e.preventDefault();
        let data;
        if(cartCtx.voucher)
        {
            data = {
                idUser: JSON.parse(localStorage.getItem('loginUser')).id,
                total: totalMoney,
                idVoucher: cartCtx.voucher.id,
                recipient: name,
                phone: phone,
                address: address,
                items: cartCtx.items,
                note: note
            }
        }
        else{
            data = {
                idUser: JSON.parse(localStorage.getItem('loginUser')).id,
                total: totalMoney,
                idVoucher: "63a52cb53c61330c421270a5",
                recipient: name,
                phone: phone,
                address: address,
                items: cartCtx.items,
                note: note
            }
        }
       
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };  

        console.log(requestOptions);    
        await fetch(`${API}/order/create`, requestOptions)
            .then(res => res.json)
            .then(response => alert("Đặt hàng thành công"))
            .catch(error => console.log(error))
        // setListCategory([...listCategory, data])
    }
    return (
        <div className="payment">
            <Header/>
            <div>
                <div className="payment_caution">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <p>
                        Do ảnh hưởng của dịch Covid nên thời gian giao hàng tại
                        một số khu vực sẽ bị ảnh hưởng
                    </p>
                </div>
            </div>
            <div className="payment_info">
                <div className="payment_info_customer-header">
                    <h3>ĐỊA CHỈ GIAO HÀNG</h3>
                    <form action="" onSubmit={handleBooking}>
                    <div className="payment_info-wrap">
                        <div className="payment_info_customer">
                            <div className="payment_info-customer-form">
                                <label htmlFor="">Họ và tên người nhận</label>
                                <input
                                    value={name}
                                    required
                                    onChange={(e) =>setName(e.target.value)}
                                    type="text"
                                    placeholder="Nhập họ tên người nhận"
                                />
                            </div>
                            <div className="payment_info-customer-form">
                                <label htmlFor="">Số điện thoại</label>
                                <input
                                    type="text"
                                    name=""
                                    value={phone}
                                    required
                                    onChange={(e) =>setPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại của bạn"
                                    id=""
                                />
                            </div>
                            <div className="payment_info-customer-form">
                                <label htmlFor="">Địa chỉ nhận hàng</label>
                                <input
                                    type="text"
                                    value={address}
                                    required
                                    onChange={(e) =>setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ nhận hàng"
                                />
                            </div>

                            <div className="payment_info-customer-form">
                                <label htmlFor="">Note</label>
                                <textarea
                                value={note}
                                required
                                onChange={(e) =>setNote(e.target.value)}
                                style={{width:"60%"}}
                                    rows='3'
                                    type="text"
                                    placeholder="Note"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="shipping_method">
                        <h3>PHƯƠNG THỨC VẬN CHUYỂN</h3>
                        <div className="shipping_method-wrap">
                            <div className="shipping_method-input">
                                <input
                                    type="radio"
                                    name=""
                                    id=""
                                    defaultChecked="true"
                                />
                                <div>
                                    <p>Giao hàng tiêu chuẩn: 15.000đ</p>
                                    <p>Thứ Sáu 01/04</p>
                                </div>
                            </div>
                            <div className="shipping_method-change">
                                <p>Thay Đổi</p>
                            </div>
                        </div>
                    </div>

                    <div className="payment_method">
                        <h3>Phương thức thanh toán</h3>

                        <form action="" name="form-payment">
                            <div className="payment-method-item">
                                <input type="radio"  />
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayapp.svg?q=10096"
                                    alt=""
                                />
                                <p>Ví zaloPay</p>
                            </div>
                            <div className="payment-method-item">
                                <input type="radio"/>
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_mocapay.svg?q=10096"
                                    alt=""
                                />
                                <p>Ví Moca</p>
                            </div>
                            <div className="payment-method-item">
                                <input type="radio"/>
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10096"
                                    alt=""
                                />
                                <p>Ví Moca</p>
                            </div>
                            <div className="payment-method-item">
                                <input type="radio"/>
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10096"
                                    alt=""
                                />
                                <p>Ví MoMo</p>
                            </div>
                            <div className="payment-method-item">
                                <input type="radio"/>
                                <img
                                    src="	https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayatm.svg?q=10096"
                                    alt=""
                                />
                                <p>ATM</p>
                            </div>
                            <div className="payment-method-item">
                                <input type="radio" defaultChecked/>
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10096"
                                    alt=""
                                />
                                <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                            </div>
                        </form>
                    </div>

                    
                    <div className="check_cart">
                        <h3>KIỂM TRA LẠI ĐƠN HÀNG</h3>
                        <div className="cart-content-product">
                            <ul className="cart-content-product-list">
                                {cartCtx.items.map((item=>(
                                        <li className="cart-content-product-items">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            defaultChecked="true"
                                            name=""
                                            id=""
                                        />
                                        <img
                                            src={item.image}
                                            alt=""
                                        />
                                        <div className="cart-info_price">
                                            <p>
                                                {item.name}
                                            </p>
                                            <p style={{color:"#c0322d"}}>{convertToVnd(item.price)}</p>
                                        </div>
                                        
                                        <div className="amount">
                                            
                                            <p>{item.amount}</p>
                                        </div>
                                        <div className="cost">{convertToVnd(item.price* item.amount)}</div>
                                    </li>
                                )))}
                                
                                
                            </ul>
                        </div>
                    </div>
                    <div className="add_voucher">
                        <div className="add_voucher-complete-header">
                            <div className="add_voucher-complete-title">
                                <p>Thành tiền</p>
                                <p>Phí vận chuyển (giao hàng tiêu chuẩn)</p>
                                {cartCtx.voucher && <p>Voucher áp dụng </p>}
                                <h4>Tổng số tiền (gồm VAT)</h4>
                            </div>
                            <div className="add_voucher-complete-price">
                                <p>{convertToVnd(cartCtx.totalAmount)}</p>
                                <p>15.000 VNĐ</p>
                                {cartCtx.voucher && <span>- {convertToVnd(cartCtx.voucher.reduce)}</span>}
                                <h4>{convertToVnd(totalMoney)}</h4>
                            </div>
                        </div>
                        <div className="add_voucher-complete">
                            <a href="./cart.html">
                                <p>
                                    <i className="fa-solid fa-arrow-left-long"></i>{" "}
                                    Quay về giỏ hàng
                                </p>
                            </a>
                            <button type="submit"> <a href="http://localhost:3001/">Xác nhận thanh toán</a></button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Payment;
