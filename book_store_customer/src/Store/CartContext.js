import React from "react";

const CartContext = React.createContext({
    items:[],
    totalAmount: 0,
    voucher:{},
    addItem: (item) => {},
    removeItem: (id) => {},
    removeAllItem:(id)=>{},
    clearCart: () => {}
});

export default CartContext;
