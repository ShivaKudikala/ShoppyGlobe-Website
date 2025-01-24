import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// store for slices

const store = configureStore({
    reducer: {
        cart: cartReducer,
    } 
})

export default store;