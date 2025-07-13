import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading'
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({params}) => {
        const {data} = await axios.get(
            `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?${params}`
        );
        console.log(data);
        return data;
    },
)
export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async ({id}) => {
        const {data} = await axios.get(
            `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?id=${id}`
        );
        console.log(data);
        console.log(`https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?id=${id}`);
        return data[0];
    },
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const selectPizzaData = state => state.pizzas

const selectCartItems = (state) => state.cart.items;

export const selectCartItemById = (id) => createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === id)
);

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer