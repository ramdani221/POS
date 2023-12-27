import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateCustomer, fetchDeleteCustomer, fetchGetCustomer, fetchLoadCustomers, fetchUpdateCustomer } from "./customerAPI";

export interface CustomerState {
    value: CustomersType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    customer: CustomersType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CustomerState = {
    value: [{ id: 0, name: '', phone: '', address: '' }],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    customer: {
        id: 0,
        name: '',
        phone: '',
        address: ''
    },
    status: 'idle'
}

export const loadCustomerAsync = createAsyncThunk(
    'Customers/loadCustomerAsync',
    async (params: Params) => {
        const { data } = await fetchLoadCustomers(params)
        return data
    }
)

export const getCustomerAsync = createAsyncThunk(
    'Customers/getCustomerAsync',
    async (params: number) => {
        const { data } = await fetchGetCustomer(params)
        return data
    }
)

export const addCustomerAsync = createAsyncThunk(
    'Customers/addCustomerAsync',
    async (input: CustomerInput) => {
        const { data } = await fetchCreateCustomer(input)
        return data
    }
)

export const updateCustomerAsync = createAsyncThunk(
    'Customers/updateCustomerAsync',
    async ({ id, input }: { id: number, input: CustomerInput }) => {
        const { data } = await fetchUpdateCustomer(id, input)
        return data
    }
)

export const deleteCustomerAsync = createAsyncThunk(
    'Customers/deleteCustomerAsync',
    async (id: number) => {
        const { data } = await fetchDeleteCustomer(id)
        return data
    }
)

export const customerSlice = createSlice({
    name: 'Customers',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.customers[action.payload.customers.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(customer => customer.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCustomerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCustomerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.customers;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadCustomerAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getCustomerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCustomerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.customer = action.payload
            })
            .addCase(getCustomerAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add } = customerSlice.actions
export const selectCustomers = (state: ReduxState) => state.customer.value;
export const getCostumer = (state: ReduxState) => state.customer.customer;
export const customersPagination = (state: ReduxState) => state.customer.footer;

export const removeCustomer = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteCustomerAsync(id));
        await dispatch(loadCustomerAsync(input));
    } catch (error) {
        throw error
    }
}

export default customerSlice.reducer