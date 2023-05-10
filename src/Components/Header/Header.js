import { Fragment } from "react";
import classes from "./Header.module.css";
import ImageUrl from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import react from "react";


const Header = (Props)=>{

    // console.log('header is running')
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React meals</h1>
                <HeaderCartButton onShow={Props.onShow}/>
            </header>
            <div className={classes['main-image']}>
                <img src={ImageUrl} alt="food" />
            </div>
        </Fragment>
    )
};

export default react.memo( Header );