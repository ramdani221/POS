import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreatePurchase, fetchDeletePurchase, fetchGetPurchase, fetchLoadPurchases, fetchUpdatePurchase } from "./purchaseAPI";

export interface PurchaseState {
    value: PurchasesType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    purchase: PurchasesType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: PurchaseState = {
    value: [],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    purchase: {
        id: 0,
        invoice: '',
        createdAt: '',
        totalsum: '',
        supplier: 0,
        operator: 0,
        Supplier: {
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

export const loadPurchaseAsync = createAsyncThunk(
    'Purchases/loadPurchaseAsync',
    async (params: Params) => {
        const { data } = await fetchLoadPurchases(params)
        return data
    }
)

export const getPurchaseAsync = createAsyncThunk(
    'Purchases/getPurchaseAsync',
    async (params: number) => {
        const { data } = await fetchGetPurchase(params)
        return data
    }
)

export const addPurchaseAsync = createAsyncThunk(
    'Purchases/addPurchaseAsync',
    async (input: PurchaseInput) => {
        const { data } = await fetchCreatePurchase(input)
        return data
    }
)

export const updatePurchaseAsync = createAsyncThunk(
    'Purchases/updatePurchaseAsync',
    async ({ id, input }: { id: number, input: PurchaseInput }) => {
        const { data } = await fetchUpdatePurchase(id, input)
        return data
    }
)

export const deletePurchaseAsync = createAsyncThunk(
    'Purchases/deletePurchaseAsync',
    async (id: number) => {
        const { data } = await fetchDeletePurchase(id)
        return data
    }
)

export const purchaseSlice = createSlice({
    name: 'Purchases',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.purchases[action.payload.purchases.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(purchase => purchase.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPurchaseAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPurchaseAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.purchases;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadPurchaseAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getPurchaseAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPurchaseAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.purchase = action.payload
            })
            .addCase(getPurchaseAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add } = purchaseSlice.actions
export const selectPurchases = (state: ReduxState) => state.purchase.value;
export const purchasesPagination = (state: ReduxState) => state.purchase.footer;
export const getPurchase = (state: ReduxState) => state.purchase.purchase

export const removePurchase = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deletePurchaseAsync(id));
        await dispatch(loadPurchaseAsync(input));
    } catch (error) {
        throw error
    }
}

export default purchaseSlice.reducer