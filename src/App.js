
import Header from "./Components/Header/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { Fragment, useCallback, useState } from "react";



function App() {
  // console.log('app is running')
  const [cartIsShown , setCartIsShown] = useState(false);

  // this function will creat for the first excution only
  const showCartHandler = useCallback( ()=>{
    setCartIsShown(true);
  },[])

  const hideCartHandler = useCallback(()=>{
    setCartIsShown(false);
  },[])

  return (
    <Fragment>
      {cartIsShown && <Cart onHide={hideCartHandler}/>}
      <Header onShow = {showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </Fragment>
  );
}

export default App;
