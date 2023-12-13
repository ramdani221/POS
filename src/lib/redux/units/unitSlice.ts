import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateUnit, fetchDeleteUnit, fetchGetUnit, fetchLoadUnits, fetchUpdateUnit } from "./unitAPI";

export interface UnitState {
    value: UnitsType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    unit: UnitsType;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: UnitState = {
    value: [{
        id: 0,
        unit: '',
        name: '',
        note: ''
    }],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    unit: {
        id: 0,
        unit: '',
        name: '',
        note: ''
    },
    status: 'idle'
}

export const loadUnitAsync = createAsyncThunk(
    'Units/loadUnitAsync',
    async (params: Params) => {
        const { data } = await fetchLoadUnits(params)
        return data
    }
)

export const getUnitAsync = createAsyncThunk(
    'Units/getUnitAsync',
    async (id: number) => {
        const { data } = await fetchGetUnit(id)
        return data
    }
)

export const addUnitAsync = createAsyncThunk(
    'Units/addUnitAsync',
    async (input: UnitInput) => {
        const { data } = await fetchCreateUnit(input)
        return data
    }
)

export const updateUnitAsync = createAsyncThunk(
    'Units/updateUnitAsync',
    async ({ id, input }: { id: number, input: UnitInput }) => {
        const { data } = await fetchUpdateUnit(id, input)
        return data
    }
)

export const deleteUnitAsync = createAsyncThunk(
    'Units/deleteUnitAsync',
    async (id: number) => {
        const { data } = await fetchDeleteUnit(id)
        return data
    }
)

export const unitSlice = createSlice({
    name: 'Units',
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(unit => unit.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUnitAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUnitAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.units;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadUnitAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getUnitAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUnitAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.unit = action.payload
            })
            .addCase(getUnitAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove } = unitSlice.actions
export const selectUnits = (state: ReduxState) => state.unit.value;
export const getUnit = (state: ReduxState) => state.unit.unit;
export const unitsPagination = (state: ReduxState) => state.unit.footer;

export const removeUnit = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteUnitAsync(id));
        await dispatch(loadUnitAsync(input));
    } catch (error) {
        return error
    }
}

export default unitSlice.reducer