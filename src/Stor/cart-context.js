
import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item)=>{},   // for auto completion 
    removeItem: (item)=>{},
    resetCtx: ()=>{},

})

export default CartContext;