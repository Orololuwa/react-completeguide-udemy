import React  from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = React.useState(true);
    const InputRef = React.useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = InputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim() === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return(
        <form className={classes.form} 
         onSubmit={onSubmitHandler}
         >
            <Input label="Amount" ref={InputRef} input={{
                id: `amount${props.id}`,
                type: "number",
                min: "1",
                max: "5",
                step: "1",
                defaultValue: "1",
            }} />
            <button type="submit" >+ Add</button>
            {!amountIsValid && <span>Please enter a valid amount</span>}
        </form>
    )
}

export default MealItemForm;