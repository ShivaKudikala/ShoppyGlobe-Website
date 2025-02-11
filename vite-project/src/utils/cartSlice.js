import { createSlice } from '@reduxjs/toolkit';
import useFetch from './useFetch.js';

// cartSlice for maintaing data of cart and functions addtocart and removefromcart

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items : [],
    },
    reducers: {
        setItemsToCart : (state, actions) => {
            state.items = actions.payload;
        },
        addToCart : (state, actions) => {
            state.items.push(actions.payload)
        },
        removeFromCart : (state, actions) => {
            state.items = state.items.filter((item) => item.id !== actions.payload);
        }
    },
})

export const {setItemsToCart, addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;