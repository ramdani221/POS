import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateSupplier, fetchDeleteSupplier, fetchGetSupplier, fetchLoadSuppliers, fetchUpdateSupplier } from "./supplierAPI";

export interface SupplierState {
    value: SuppliersType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    supplier: SuppliersType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: SupplierState = {
    value: [{id: 0, name: '', phone: '', address: ''}],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    supplier: {
        id: 0,
        name: '',
        phone: '',
        address: ''
    },
    status: 'idle'
}

export const loadSupplierAsync = createAsyncThunk(
    'Suppliers/loadSupplierAsync',
    async (params: Params) => {
        const { data } = await fetchLoadSuppliers(params)
        return data
    }
)

export const getSupplierAsync = createAsyncThunk(
    'Suppliers/getSupplierAsync',
    async (id: number) => {
        const { data } = await fetchGetSupplier(id)
        return data
    }
)

export const addSupplierAsync = createAsyncThunk(
    'Suppliers/addSupplierAsync',
    async (input: SupplierInput) => {
        const { data } = await fetchCreateSupplier(input)
        return data
    }
)

export const updateSupplierAsync = createAsyncThunk(
    'Suppliers/updateSupplierAsync',
    async ({ id, input }: { id: number, input: SupplierInput }) => {
        const { data } = await fetchUpdateSupplier(id, input)
        return data
    }
)

export const deleteSupplierAsync = createAsyncThunk(
    'Suppliers/deleteSupplierAsync',
    async (id: number) => {
        const { data } = await fetchDeleteSupplier(id)
        return data
    }
)

export const supplierSlice = createSlice({
    name: 'Suppliers',
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(supplier => supplier.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSupplierAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSupplierAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.suppliers;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadSupplierAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getSupplierAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSupplierAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.supplier = action.payload
            })
            .addCase(getSupplierAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove } = supplierSlice.actions
export const selectSuppliers = (state: ReduxState) => state.supplier.value;
export const getSupplier = (state: ReduxState) => state.supplier.supplier;
export const suppliersPagination = (state: ReduxState) => state.supplier.footer;

export const removeSupplier = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteSupplierAsync(id));
        await dispatch(loadSupplierAsync(input));
    } catch (error) {
        console.log(error)
    }
}

export default supplierSlice.reducer