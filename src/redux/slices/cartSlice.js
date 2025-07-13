import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            const total = state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
            state.totalPrice = Math.round(total * 100) / 100;
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem && findItem.count > 1) {
                findItem.count--;
            } else if (findItem) {
                state.items = state.items.filter(obj => obj.id !== action.payload.id);
            }


            state.totalPrice = Math.round(
                state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0) * 100
            ) / 100;
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id);

            state.totalPrice = Math.round(
                state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0) * 100
            ) / 100;
        },

        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})


export const cartSelector = (state) => state.cart;

export const {addProduct, minusItem, removeItem, clearItems} = cartSlice.actions
export default cartSlice.reducer