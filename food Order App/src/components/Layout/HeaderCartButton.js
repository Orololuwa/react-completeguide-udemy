import React from "react";
import CartIcon from "../Cart/Carticon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [buttonBump, setButtonBump] = React.useState(false);
    const ctx = React.useContext(CartContext);

    const {items} = ctx;

    const noOfCartItems = items.reduce((acc, el)=>{
        return acc + el.amount
    }, 0)

    const btnClasses = `${classes.button} ${buttonBump? classes.bump : ""}`;

    React.useEffect(() => {
        if (items.length === 0){
            return;
        }
        setButtonBump(true);

        const timer = setTimeout(() => {
            setButtonBump(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }
        
    }, [items])

    return <button className={btnClasses} onClick={props.Click} >
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge} >
            {noOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;