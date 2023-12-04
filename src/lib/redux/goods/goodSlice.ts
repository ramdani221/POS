import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateGood, fetchDeleteGood, fetchLoadGoods, fetchUpdateGood } from "./goodAPI";

export interface GoodState {
    value: GoodsType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    }
    status: 'idle' | 'loading' | 'failed'
}

const initialState: GoodState = {
    value: [],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
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
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.goods[action.payload.goods.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(good => good.id !== action.payload)
            state.footer.total -= 1
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
    }
})

export const { remove, add } = goodSlice.actions
export const selectGoods = (state: ReduxState) => state.good.value;
export const goodsPagination = (state: ReduxState) => state.good.footer;

export const removeGood = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(id));
        await dispatch(deleteGoodAsync(id));
        const { data } = await fetchLoadGoods(input)
        if (!data.goods.length || data.goods.length === 1 || pages === 1) return
        dispatch(add(data))
    } catch (error) {
        console.log(error)
    }
}

export default goodSlice.reducer