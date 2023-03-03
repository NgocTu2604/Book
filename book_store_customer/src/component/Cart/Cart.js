import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Store/CartContext";
import Header from "../UI/Header/Header";
import CartItem from "./CartItem";
import {API} from "../../constant.js"

function Cart(props) {
    const[listVoucher, setListVoucher] = useState([]);
    const[a, setA] = useState("Áp dụng")
    const cartCtx = useContext(CartContext);
    let countApply = 0;
    const [reduce, setReduce] =useState(0);
    console.log(cartCtx);
    const listBookCart = cartCtx.items;
    const totalAmount = cartCtx.totalAmount;
    console.log(listBookCart);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const handleDeleteItem = (id) =>{
        if(id)
        {
            cartCtx.removeAllItem(id);
            cartCtx.totalAmount = 0;
        }
    }
    console.log(cartCtx.items);

    const fetchListVoucher = useCallback(async () => {
        try {
            const response = await fetch(
                `${API}/voucher`,
            );
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListVoucher = [];
            console.log(data);
            for (let i =1; i< data.length; i++ ) {
                loadListVoucher.push({
                    id: data[i]._id,
                    name: data[i].name,
                    reduce: data[i].reduce,
                    qty: data[i].qty,
                    mile: data[i].mile,
                    slug:data[i].slug
                });
            }
            
            setListVoucher(loadListVoucher);
        } catch (error) {
        }
    }, []);
    useEffect(() => {
        fetchListVoucher();
        
    }, [fetchListVoucher]);
    
    const handleApplyVoucher = (id,reduce) =>{
        setA("Đã được áp dụng");
        cartCtx.voucher = {id, reduce};
        setReduce(reduce);
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
    
      const handlePayment = (e) =>{
        
            if(cartCtx.items.length === 0)
            {
                e.preventDefault();
                alert('Giỏ hàng rỗng');
            }
      }
    
    return (
        <div className="Cart">
            <Header />

            <div className="cart-content container-cart">
                <h4>GIỎ HÀNG ({numberOfCartItems} sản phẩm)</h4>
                <div className="cart-content-wrap">
                    <div className="cart-content-left">
                        <div className="cart-content-header">
                            <div className="select-all">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked="true"
                                    name=""
                                    id=""
                                />
                                <p>Chọn tất cả ({numberOfCartItems} sản phẩm)</p>
                            </div>
                            <div className="select-option">
                                <p>Số lượng</p>
                                <p>Thành tiền</p>
                            </div>
                        </div>

                        <div className="cart-content-product">
                            <ul className="cart-content-product-list">
                                {listBookCart.map((itemCart) =>(
                                    <CartItem key = {itemCart.id} {...itemCart} onDelete = {() =>handleDeleteItem.bind(null, itemCart.id)} />
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                    <div className="cart-content-right">
                        <div className="cart-content-right-header">
                            <div className="cart-content-content-right-sale">
                                <img
                                    src="	https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/promotion/ico_coupon.svg"
                                    alt=""
                                />
                                KHUYẾN MÃI
                            </div>
                            <div className="cart-content-content-right-more">
                                Xem Thêm
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                        {
                           
                            listVoucher.map((item)=>{
                                let apply = false;
                                let destination = item.mile - totalAmount;
                                if(destination <= 0)
                                {
                                    destination = 0;
                                    apply = true;
                                    countApply +=1
                                }
                                
                                return(
                                <div key={item.id} className="cart_voucher">
                                    <div className="cart_voucher-title">
                                        <h3>MÃ GIẢM {convertToVnd(item.reduce)}</h3>
                                        <a href="/#">Chi tiết</a>
                                    </div>
                                    <div className="cart_voucher-sub">
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="cart-voucher-content">
                                        <div className="cart-voucher-content-bar">
                                            <div className="cart-voucher-content-bar-chart"></div>
                                            <p>Mua thêm {destination}đ để nhận mã</p>
                                        </div>
                                        {!apply && <div className="btn-buy-more">Mua Thêm</div>}
                                        {apply && <div className="btn-apply" onClick={() =>handleApplyVoucher(item.id,item.reduce)} >{a}</div>}
                                    </div>
                                </div>
                            )})
                        }
                        
                        
                        <div className="cart_voucher">
                            <div className="into_money">
                                <p>Thành tiền</p>
                                <p>{convertToVnd(totalAmount)}</p>
                            </div>
                            <div className="into_money">
                                <p>Giảm giá</p>
                                <p>- {convertToVnd(reduce)}</p>
                            </div>
                            {/* <div className="into_money">
                                <p>Phí vận chuyển</p>
                                <p>15.000đ</p>
                            </div> */}
                            <div className="total-price">
                                <p>Tổng số tiền(gồm VAT)</p>
                                <p>{convertToVnd(totalAmount - reduce)}</p>
                            </div>
                            
                            <Link
                                className="btn-payment-links"
                                to="/payment"
                            >
                                <div onClick={handlePayment} className="btn-payment">Đặt hàng</div>
                            </Link>
                            <p className="voucher_valid">
                                (Giảm giá trên web chỉ áp dụng cho bán lẻ)
                            </p>
                            <div className="voucher_useful">
                                <p>{countApply} khuyến mãi đủ điều kiện</p>
                                <i className="fa-solid fa-angle-right"></i>
                            </div>
                            <h6>
                                Không thể áp dụng đồng thời nhiều nhiều mã
                                <i className="fa-solid fa-circle-exclamation"></i>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
