import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import axios from "axios";
import {RootState} from "../store";
import {Pizza} from "../../entity/Pizza";

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const fetchPizzas = createAsyncThunk<Pizza[], { params: URLSearchParams }>(
    'pizza/fetchPizzasStatus',
    async ({params}) => {
        const {data} = await axios.get<Pizza[]>(
            `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items`, {params}
        );
        console.log(`https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?${params}`);
        console.log(data);
        return data as Pizza[];
    },
)
export const fetchPizza = createAsyncThunk<any ,{id: string }>(
    'pizza/fetchPizzaStatus',
    async ({id}) => {
        const {data} = await axios.get(
            `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?id=${id}`
        );
        console.log(`https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?id=${id}`);
        console.log(data);
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
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizzas

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemById = (id: string) => createSelector(
    [selectCartItems],
    (items) => items.find((item: any) => item.id === id)
);

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer