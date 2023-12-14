import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateSale, fetchDeleteSale, fetchGetSale, fetchLoadSales, fetchUpdateSale } from "./saleAPI";

export interface SaleState {
    value: SalesType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    sale: SalesType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: SaleState = {
    value: [],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    sale: {
        id: 0,
        invoice: '',
        createdAt: '',
        totalsum: '',
        pay: '',
        change: '',
        customer: 0,
        operator: 0,
        Customer: {
            id: 0,
            name: '',
            address: '',
            phone: '',
        },
        User: {
            id: 0,
            email: '',
            name: '',
            role: '',
        }
    },
    status: 'idle'
}

export const loadSaleAsync = createAsyncThunk(
    'Sales/loadSaleAsync',
    async (params: Params) => {
        const { data } = await fetchLoadSales(params)
        return data
    }
)

export const getSaleAsync = createAsyncThunk(
    'Sales/getSaleAsync',
    async (params: number) => {
        const { data } = await fetchGetSale(params)
        return data
    }
)

export const addSaleAsync = createAsyncThunk(
    'Sales/addSaleAsync',
    async (input: SaleInput) => {
        const { data } = await fetchCreateSale(input)
        return data
    }
)

export const updateSaleAsync = createAsyncThunk(
    'Sales/updateSaleAsync',
    async ({ id, input }: { id: number, input: SaleInput }) => {
        const { data } = await fetchUpdateSale(id, input)
        return data
    }
)

export const deleteSaleAsync = createAsyncThunk(
    'Sales/deleteSaleAsync',
    async (id: number) => {
        const { data } = await fetchDeleteSale(id)
        return data
    }
)

export const saleSlice = createSlice({
    name: 'Sales',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.sales[action.payload.sales.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(sale => sale.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSaleAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSaleAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.sales;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadSaleAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getSaleAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSaleAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.sale = action.payload
            })
            .addCase(getSaleAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add } = saleSlice.actions
export const selectSales = (state: ReduxState) => state.sale.value;
export const salesPagination = (state: ReduxState) => state.sale.footer;
export const getSale = (state: ReduxState) => state.sale.sale

export const removeSale = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteSaleAsync(id));
        await dispatch(loadSaleAsync(input));
    } catch (error) {
        console.log(error)
    }
}

export default saleSlice.reducer