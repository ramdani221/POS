import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";
import { fetchCreateUnit, fetchDeleteUnit, fetchLoadUnits, fetchUpdateUnit } from "./unitAPI";

export interface UnitState {
    value: UnitsType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    }
    status: 'idle' | 'loading' | 'failed'
}

const initialState: UnitState = {
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

export const loadUnitAsync = createAsyncThunk(
    'Units/loadUnitAsync',
    async (params: UnitParams) => {
        const { data } = await fetchLoadUnits(params)
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
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.units[action.payload.units.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
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
    }
})

export const { remove, add } = unitSlice.actions
export const selectUnits = (state: ReduxState) => state.unit.value;
export const unitsPagination = (state: ReduxState) => state.unit.footer;

export const removeUnit = (id: number, input: UnitParams, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteUnitAsync(id));
        const { data } = await fetchLoadUnits(input)
        if (!data.units.length || pages === 1) return
        dispatch(add(data))
    } catch (error) {
        console.log(error)
    }
}

export default unitSlice.reducer