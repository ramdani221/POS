import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateGood, fetchDeleteGood, fetchGetGood, fetchLoadGoods, fetchUpdateGood } from "./goodAPI";

export interface GoodState {
    value: GoodsType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    good: GoodsType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: GoodState = {
    value: [{id: 0,
        barcode: '',
        name: '',
        stock: 0,
        purchaseprice: '',
        sellingprice: '',
        unit: 0,
        picture: '',
        Unit: {
            id: 0,
            unit: '',
            name: '', 
            note: ''}
        }],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    good: {
        id: 0,
        barcode: '',
        name: '',
        stock: 0,
        purchaseprice: '',
        sellingprice: '',
        unit: 0,
        picture: '',
        Unit: {
            id: 0,
            unit: '',
            name: '',
            note: '',
        }
    },
    status: 'idle'
}

export const loadGoodAsync = createAsyncThunk(
    'Goods/loadGoodAsync',
    async (params: Params) => {
        const { data } = await fetchLoadGoods(params)
        return data
    }
)

export const getGoodAsync = createAsyncThunk(
    'Goods/getGoodAsync',
    async (id: number) => {
        const { data } = await fetchGetGood(id)
        return data
    }
)

export const addGoodAsync = createAsyncThunk(
    'Goods/addGoodAsync',
    async (input: FormDataEntryValue) => {
        const { data } = await fetchCreateGood(input)
        return data
    }
)

export const updateGoodAsync = createAsyncThunk(
    'Goods/updateGoodAsync',
    async ({ id, input }: { id: number, input: FormDataEntryValue }) => {
        const { data } = await fetchUpdateGood(id, input)
        return data
    }
)

export const deleteGoodAsync = createAsyncThunk(
    'Goods/deleteGoodAsync',
    async (id: number | string) => {
        const { data } = await fetchDeleteGood(id)
        return data
    }
)

export const goodSlice = createSlice({
    name: 'Goods',
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(good => good.id !== action.payload)
            state.footer.total -= 1
        },
        addStock: (state, action: PayloadAction<{ id: number, qty: number }>) => {
            state.value = state.value.map(item => {
                if (item.id === action.payload.id) return { ...item, stock: item.stock + action.payload.qty }
                return item
            })
        },
        reduceStock: (state, action: PayloadAction<{ id: number, qty: number }>) => {
            state.value = state.value.map(item => {
                if (item.id === action.payload.id) return { ...item, stock: (item.stock - action.payload.qty) }
                return item
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGoodAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadGoodAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.goods;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadGoodAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getGoodAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGoodAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.good = action.payload
            })
            .addCase(getGoodAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, addStock, reduceStock } = goodSlice.actions
export const selectGoods = (state: ReduxState) => state.good.value;
export const getGood = (state: ReduxState) => state.good.good;
export const goodsPagination = (state: ReduxState) => state.good.footer;

export const removeGood = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(id));
        await dispatch(deleteGoodAsync(id));
        await dispatch(loadGoodAsync(input));
    } catch (error) {
        return error
    }
}

export default goodSlice.reducer