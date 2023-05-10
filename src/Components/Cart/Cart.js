

import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../Stor/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import Checkout from './Checkout';

const Cart = props =>{
    // console.log('cart is running')
    const cartCtx = useContext(CartContext)
    const [cartCtxIsFull , setCartCtxIsFull] = useState(true);
    const [showAction ,setShowAction] = useState(true)
    const [dataIsSubmmited , setDataIsSubmmited] = useState(false)


    const onAddHandler= (item)=>{
        cartCtx.addItem({...item , amount:1})
    }
    const onRemoveHandler= (item)=>{
        cartCtx.removeItem(item)
    }

    const orderHandler = ()=>{
        setShowAction(false)
    }

    // sending the order to the server
    const confirmHandler= async (userData)=>{
        
        await fetch('https://food-app-8704a-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        })

        setDataIsSubmmited(true)

        // reset the context
        cartCtx.resetCtx()
    }


    const ItemList = cartCtx.items.map(item => <CartItem 
        key={item.id}
        id={item.id}
        name = {item.name}
        amount = {item.amount}
        price = {item.price}
        onAdd={onAddHandler.bind(null ,item)}
        onRemove={onRemoveHandler.bind(null , item)}
    />);


    useEffect(()=>{
        if(cartCtx.items.length === 0){
            setCartCtxIsFull(false)
        }
    },[cartCtx.items.length])

    
    const Actions =  
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
        {cartCtxIsFull && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>



    const totalPrice = `$${cartCtx.totalAmount.toFixed(2)}`

    const dataNotSubmmitedModalContent =
    <Fragment>
            <ul className={classes['cart-items']}>
                {ItemList} 
            </ul>  
            <div className={classes.total}>
                <span>Total</span>
                <span>{totalPrice}</span>
            </div>
            
            {showAction? Actions : <Checkout onConfirm={confirmHandler} onCancel={props.onHide}/>}

    </Fragment>

    const dataIsSubmmitedModalContent = 
    <Fragment>
        <p> your order sucssefully send!</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
        </div>
    </Fragment>

    return (
        <Modal onHide={props.onHide}>
            {dataIsSubmmited? dataIsSubmmitedModalContent : dataNotSubmmitedModalContent}
        </Modal>
    )
};

export default Cart;