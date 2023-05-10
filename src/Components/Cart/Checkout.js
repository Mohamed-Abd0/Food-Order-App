import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  // console.log('Checkout is running')
 
  const [formInputsValidity , setFormInputsValidity]=useState({
    nameIsValid: true,
    streetIsValid: true,
    postalIsValid: true,
    cityIsValid: true
  })

  const nameInputRef=useRef()
  const streetInputRef=useRef()
  const postalInputRef=useRef()
  const cityInputRef=useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName= nameInputRef.current.value;
    const enteredStreet= streetInputRef.current.value;
    const enteredPostal= postalInputRef.current.value;
    const enteredCity= cityInputRef.current.value;

    const isvalid = (value)=>{ return value !== ''};
    const isHasefiveChar = (value)=>{ return value.length === 5};

    const nameIsValid = isvalid(enteredName);
    const streetIsValid = isvalid(enteredStreet);
    const postalIsValid = isHasefiveChar(enteredPostal);
    const cityIsValid = isvalid(enteredCity);
    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid

    setFormInputsValidity({
      nameIsValid: nameIsValid,
      streetIsValid: streetIsValid,
      postalIsValid: postalIsValid,
      cityIsValid: cityIsValid
    })

    if(formIsValid){
      // send the user data to the cart component
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
      })
    }
    
    
  };


  const nameClasses = `${classes.control} ${formInputsValidity.nameIsValid? '' : classes.invalid}`
  const streetClasses = `${classes.control} ${formInputsValidity.streetIsValid? '' : classes.invalid}`
  const postalClasses = `${classes.control} ${formInputsValidity.postalIsValid? '' : classes.invalid}`
  const cityClasses = `${classes.control} ${formInputsValidity.cityIsValid? '' : classes.invalid}`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.nameIsValid && <p>enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.streetIsValid && <p>enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputsValidity.postal && <p>enter a valid postal! (5 characters)</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.cityIsValid && <p>enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
