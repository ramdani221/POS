import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "@/lib/redux/store";
import { fetchLoadNotifs } from "./notifAPI";

export interface NotifState {
    value: NotifsType[];
    status: 'idle' | 'loading' | 'failed'
}

const initialState: NotifState = {
    value: [],
    status: 'idle'
}

export const loadNotifAsync = createAsyncThunk(
    'Notifs/loadNotifAsync',
    async () => {
        const { data } = await fetchLoadNotifs()
        return data
    }
)

export const notifSlice = createSlice({
    name: 'Notifs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNotifAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadNotifAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(loadNotifAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const selectNotifs = (state: ReduxState) => state.notif.value;

export default notifSlice.reducer