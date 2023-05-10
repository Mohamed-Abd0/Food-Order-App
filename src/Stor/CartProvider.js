import React from "react";
import { useReducer } from "react";
import CartContext from "./cart-context";



const cartReducer = (state , action )=>{
    if (action.type=== 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.amount*action.item.price;
        let updatedItems;
        
        // check if the added Item is exist or not 
        const existingItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const existingItem = state.items[existingItemIndex]
        
        if(existingItem){

            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            
            updatedItems = [...state.items];
            updatedItems[existingItemIndex]= updatedItem
            
        }else{

            updatedItems = state.items.concat(action.item);
        }
        
        return({
            totalAmount: updatedTotalAmount,
            items: updatedItems,
        })
    }
    
    if(action.type=== 'REMOVE'){

        const updatedTotalAmount = state.totalAmount - action.item.price;
        let updatedItems;

        if(action.item.amount===1){
            updatedItems = state.items.filter((item)=> item.id !== action.item.id)
        }else{
            const existingItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount -1
            }
            
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem

        }

        return({
            totalAmount: updatedTotalAmount,
            items: updatedItems,
        })

    }

    if(action.type=== 'RESET'){
        const updatedTotalAmount = 0;
        const updatedItems = []
        return({
            totalAmount: updatedTotalAmount,
            items: updatedItems,
        })
    }
};

const defaultState = {
    items: [],
    totalAmount: 0,
}



const CartProvider = props =>{
    const [cartstate , dispachFun]= useReducer(cartReducer , defaultState);

    const addItemHandler = (item)=>{
        dispachFun({type: 'ADD' , item: item})
    };
    const removeItemHandler = (item)=>{
        dispachFun({type: 'REMOVE' , item: item})
    };
    const resetHandler = ()=>{
        dispachFun({type: 'RESET'})
    }

    const cartContext = {
        items: cartstate.items,
        totalAmount: cartstate.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        resetCtx: resetHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;