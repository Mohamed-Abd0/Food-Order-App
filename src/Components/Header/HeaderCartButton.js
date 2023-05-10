
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext,useEffect,useState } from "react";
import CartContext from "../../Stor/cart-context";
import react from "react";




const HeaderCartButton = (props)=>{

    // console.log('HeaderCartButton is running')
    const [bump ,setBump] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber , item)=>{
        return curNumber + item.amount
    } ,0)

    const {items} = cartCtx
    const cartbuttonClasses = `${classes.button} ${ bump? classes.bump : ''}`

    useEffect(()=>{
        if(items.length!== 0){
            setBump(true);
        }

        const timer= setTimeout(() => {
            setBump(false)
        }, 300);

        return ()=>{
            clearTimeout(timer)
        }
    },[items])
    
    return(
        <button className={cartbuttonClasses} onClick={props.onShow}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge} >{numberOfCartItems}</span>
        </button>
    )
};

export default react.memo( HeaderCartButton );