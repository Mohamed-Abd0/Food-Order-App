
import react from "react";
import { useContext } from "react";
import CartContext from "../../../Stor/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = props =>{

    // console.log( 'MealItem is running')
    const cartCtx = useContext(CartContext);
    

    const addItemHandler = (enteredAmount)=>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: enteredAmount,
        })
    }

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{props.price}</div>
            </div>
            <div>
                <MealItemForm onAddItem={addItemHandler} id={props.id}/>
            </div>
      </li>
    )
};


export default react.memo( MealItem );