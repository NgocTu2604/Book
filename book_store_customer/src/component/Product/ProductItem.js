import React, { useState } from "react";
import CartContext from "../../Store/CartContext";
import { useContext } from "react";
import ProductItemForm from "./ProductItemForm";
function ProductItem(props) {
    const item = props.item;
    const [qty, setQty] = useState(item.inventory);
    console.log(item);
    const cartCtx = useContext(CartContext);
    
    
    function handleAddToCart (amount){
        // if(typeof(Storage) !== "undefined" && localStorage.getItem('loginUser'))
        // {
        //     alert('Vui lòng đăng nhập!');
        // }
        // else{
            setQty(qty - amount);
            if(amount> qty)
            {
                alert("Không đủ sách trong kho")
            }
            else{
                cartCtx.addItem({
                    id: item.id,
                    name : item.name,
                    image: item.image,
                    amount: amount,
                    price: item.price,
                    des: item.des,
                    inventory: item.inventory
                })
            }
        // }
        
        
    }
    function convertToVnd(amount) {
        const parts = String(amount).split('.');
        let intPart = parts[0];
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        if (parts.length > 1) {
          const decPart = parts[1].substring(0, 2).padEnd(2, '0');
          return `${intPart} đ${decPart}`;
        } else {
          return `${intPart} đ`;
        }
      }

    return (
        <li className="product-items" key = {item.id}>
            <div style={{padding:"16px 0px"}}>
                <img src={item.image} alt="" />
                <div className="product-items-wrap">
                    <h2 className="product-title ellipsis">{item.name}</h2>
                    <h4 className="price-sale">{convertToVnd(item.price)}</h4>
                </div>
                    <div style={{display:"flex", justifyContent:"space-around"}}><ProductItemForm amount= {item.inventory} onAddToCart = {handleAddToCart}/></div>
                <div className="overlay"></div>
            </div>
        </li>
    );
}

export default ProductItem;
