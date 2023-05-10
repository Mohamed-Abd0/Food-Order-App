
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props)=>{

    // console.log( 'MealItemForm is running')
    const [amountIsValid , setAmountIsValid] = useState(true);
    const Amount = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        // reset the error message
        setAmountIsValid(true)

        const enteredAmount = +Amount.current.value;

        // validate the input value
        if(enteredAmount===0 || enteredAmount<0 || enteredAmount>5){
            setAmountIsValid(false)
        }

        // send the amount to the mealIem component
        props.onAddItem(enteredAmount)

        
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
            ref = {Amount}
            lable={props.id}
            Input={{
                id: props.id,
                type: 'number',
                min : 1,
                max : 5,
                step: 1,
                defaultValue:1,
                
            }}
            />
            <button>+Add</button>
            {!amountIsValid && <p>amount is invalid</p>}
        </form>
    )
};


export default MealItemForm;