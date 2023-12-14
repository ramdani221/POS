import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateSaleitem, fetchDeleteSaleitem, fetchLoadSaleitems } from "./saleitemAPI";

export interface SaleitemState {
    value: SaleitemsType[];
    status: 'idle' | 'loading' | 'failed'
}

const initialState: SaleitemState = {
    value: [],
    status: 'idle'
}

export const loadSaleitemAsync = createAsyncThunk(
    'Saleitems/loadSaleitemAsync',
    async (params: string | number) => {
        const { data } = await fetchLoadSaleitems(params)
        return data
    }
)

export const addSaleitemAsync = createAsyncThunk(
    'Saleitems/addSaleitemAsync',
    async (input: SaleitemInput) => {
        const { data } = await fetchCreateSaleitem(input)
        return data
    }
)

export const deleteSaleitemAsync = createAsyncThunk(
    'Saleitems/deleteSaleitemAsync',
    async (id: number) => {
        const { data } = await fetchDeleteSaleitem(id)
        return data
    }
)

export const saleitemSlice = createSlice({
    name: 'Saleitems',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<SaleitemsType>) => {
            'id'
            state.value.push(action.payload);
        },
        update: (state, action: PayloadAction<SaleitemInput>) => {
            state.value = state.value.map(item => {
                if (item.invoice === action.payload.invoice &&
                    item.itemcode === action.payload.itemcode)
                    return { ...item, quantity: item.quantity + action.payload.quantity, totalprice: (Number(item.totalprice) + Number(action.payload.totalprice)).toString() }
                return item
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(saleitem => saleitem.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSaleitemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSaleitemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(loadSaleitemAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add, update } = saleitemSlice.actions
export const selectSaleitems = (state: ReduxState) => state.saleitem.value;

export const addSaleitem = (input: SaleitemInput): ReduxThunkAction => async (dispatch, getState) => {
    const id = Date.now()
    const currentState = selectSaleitems(getState())
    const saleitem = currentState.find(item => item.invoice === input.invoice && item.itemcode === input.itemcode)
    if (saleitem) {
        dispatch(update(input))
        return dispatch(addSaleitemAsync(input))
    }
    dispatch(addSaleitemAsync(input))
        .then(({ payload }) => dispatch(add(payload)))
        .catch(error => { throw error })
}

export const deleteSaleItem = (id: number): ReduxThunkAction => async (dispatch, getState) => {
    dispatch(remove(id));
    dispatch(deleteSaleitemAsync(id));
}

export default saleitemSlice.reducer