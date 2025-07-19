import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: number;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: 0
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<number>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = Number(action.payload.sort)
        }
    }
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const {setCategoryId,setSearchValue,setCurrentPage,setSort, setFilters} = filterSlice.actions
export default filterSlice.reducer