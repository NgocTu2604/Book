import React from "react";


function CartItem(props) {
    
    const totalPrice = props.amount* props.price;
    let totalPriceConvert;
    const totalPriceString =  totalPrice +'';
    if(totalPriceString.length > 3)
    {
        totalPriceConvert = totalPriceString.slice(0, 1)+ "." + totalPriceString.slice(1);
    }
    else{
        totalPriceConvert = totalPriceString;
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

    return (
        <li className="cart-content-product-items">
            <input
                type="checkbox"
                className="checkbox"
                checked="true"
                name=""
                id=""
            />
            <img
                src = {props.image}
                alt=""
            />
            <div className="cart-info_price">
                <p>{props.name}</p>
                <p>{convertToVnd(props.price)}</p>
            </div>
            <div className="amount">
                <div className="reduce">-</div>
                <p>{props.amount}</p>
                <div className="raise">+</div>
            </div>
            <div className="cost">{convertToVnd(totalPriceConvert)}</div>
            <div className="delete" onClick={props.onDelete()}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </li>
    );
}

export default CartItem;
