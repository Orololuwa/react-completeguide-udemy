import React from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0
}

const CartReducer = (state, action) => {
    if (action.type === "ADD"){

        const existingItemIndex = state.items.findIndex(item => {
            return item.id === action.item.id
        })

        const existingCartItem = state.items[existingItemIndex]
        let updatedItems;

        if (existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem
        }else{
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === "REMOVE"){
        const existingItemIndex = state.items.findIndex(item => {
            return item.id === action.id
        })
        const existingCartItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultState
}

const CartProvider = props => {

    const [CartState, dispatchCartAction] = React.useReducer(CartReducer, defaultState);

    const addCartItemHandler = (item) => {
        dispatchCartAction({type: "ADD", item: item})
    }

    const removeCartItemHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id})
    }


    const cartContext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount  ,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler
    }

    return (
        <CartContext.Provider value={cartContext} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;