import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "@/lib/redux/store";
import { fetchCreateNotif, fetchLoadNotifs, fetchUpdateNotif } from "./notifAPI";

export interface NotifState {
    value: { notifs: NotifsType[], count: number };
    status: 'idle' | 'loading' | 'failed'
}

const initialState: NotifState = {
    value: { notifs: [], count: 0 },
    status: 'idle'
}

export const loadNotifAsync = createAsyncThunk(
    'Notifs/loadNotifAsync',
    async () => {
        const { data } = await fetchLoadNotifs()
        return data
    }
)

export const addNotifAsync = createAsyncThunk(
    'Notifs/addNotifAsync',
    async (input: NotifInput) => {
        const { data } = await fetchCreateNotif(input)
        return data
    }
)

export const updateNotifAsync = createAsyncThunk(
    'Notifs/updateNotifAsync',
    async (id: string) => {
        const { data } = await fetchUpdateNotif(id)
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