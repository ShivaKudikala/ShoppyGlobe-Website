import { createSlice } from '@reduxjs/toolkit'

// cartSlice for maintaing data of cart and functions addtocart and removefromcart

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart : (state, actions) => {
            state.push(actions.payload)
        },
        removeFromCart : (state, actions) => {
            return state.filter((item) => item.id !== actions.payload);
        }
    },
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;