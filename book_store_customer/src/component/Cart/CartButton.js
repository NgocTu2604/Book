import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Store/CartContext";


function CartButton(props) {
    const cartCtx = useContext(CartContext);
    const [isChangeCart, setIsChangeCart] = useState(false);
    const { items } = cartCtx;


    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsChangeCart(true);
    
        const timer = setTimeout(() => {
            setIsChangeCart(false);
        }, 300);
    
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        
        return curNumber + item.amount;
    }, 0);
    return (
        <div className="header_cart">
            <Link to="/cart" className={isChangeCart}>
                <i className="fa-solid fa-cart-arrow-down"></i>
            </Link>
            <p>{numberOfCartItems}</p>
        </div>
    );
}

export default CartButton;
