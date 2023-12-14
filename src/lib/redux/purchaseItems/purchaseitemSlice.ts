import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreatePurchaseitem, fetchDeletePurchaseitem, fetchLoadPurchaseitems } from "./purchaseitemAPI";
import { error } from "console";

export interface PurchaseitemState {
    value: PurchaseitemsType[];
    status: 'idle' | 'loading' | 'failed'
}

const initialState: PurchaseitemState = {
    value: [],
    status: 'idle'
}

export const loadPurchaseitemAsync = createAsyncThunk(
    'Purchaseitems/loadPurchaseitemAsync',
    async (params: string | number) => {
        const { data } = await fetchLoadPurchaseitems(params)
        return data
    }
)

export const addPurchaseitemAsync = createAsyncThunk(
    'Purchaseitems/addPurchaseitemAsync',
    async (input: PurchaseitemInput) => {
        const { data } = await fetchCreatePurchaseitem(input)
        return data
    }
)

export const deletePurchaseitemAsync = createAsyncThunk(
    'Purchaseitems/deletePurchaseitemAsync',
    async (id: number) => {
        const { data } = await fetchDeletePurchaseitem(id)
        return data
    }
)

export const purchaseitemSlice = createSlice({
    name: 'Purchaseitems',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<PurchaseitemsType>) => {
            'id'
            state.value.push(action.payload);
        },
        update: (state, action: PayloadAction<PurchaseitemInput>) => {
            state.value = state.value.map(item => {
                if (item.invoice === action.payload.invoice &&
                    item.itemcode === action.payload.itemcode)
                    return { ...item, quantity: item.quantity + action.payload.quantity, totalprice: (Number(item.totalprice) + Number(action.payload.totalprice)).toString() }
                return item
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(purchaseitem => purchaseitem.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPurchaseitemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPurchaseitemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(loadPurchaseitemAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add, update } = purchaseitemSlice.actions
export const selectPurchaseitems = (state: ReduxState) => state.purchaseitem.value;

export const addPurchaseitem = (input: PurchaseitemInput): ReduxThunkAction => async (dispatch, getState) => {
    const currentState = selectPurchaseitems(getState())
    const purchaseitem = currentState.find(item => item.invoice === input.invoice && item.itemcode === input.itemcode)
    if (purchaseitem) {
        dispatch(update(input))
        return dispatch(addPurchaseitemAsync(input))
    }
    dispatch(addPurchaseitemAsync(input))
        .then(({ payload }) => dispatch(add(payload)))
        .catch(error => { throw error })
}

export const deletePurchaseItem = (id: number): ReduxThunkAction => async (dispatch, getState) => {
    dispatch(remove(id));
    dispatch(deletePurchaseitemAsync(id));
}

export default purchaseitemSlice.reducer