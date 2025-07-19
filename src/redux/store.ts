import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzaSlice
    },
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()