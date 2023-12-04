import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser, fetchDeleteUser, fetchLoadUsers, fetchUpdateUser } from "./userAPI";
import { ReduxState, ReduxThunkAction } from "@/lib/redux/store";

export interface UserState {
    value: UsersType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    }
    status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
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

export const loadUserAsync = createAsyncThunk(
    'users/loadUserAsync',
    async (params: Params) => {
        const { data } = await fetchLoadUsers(params)
        return data
    }
)

export const addUserAsync = createAsyncThunk(
    'users/addUserAsync',
    async (input: UserInput) => {
        const { data } = await fetchCreateUser(input)
        return data
    }
)

export const updateUserAsync = createAsyncThunk(
    'users/updateUserAsync',
    async ({ id, input }: { id: number, input: UserEdit }) => {
        const { data } = await fetchUpdateUser(id, input)
        return data
    }
)

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUserAsync',
    async (id: number) => {
        const { data } = await fetchDeleteUser(id)
        return data
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload.users[action.payload.users.length - 1]);
            state.footer.pages = action.payload.pages;
            state.footer.total = action.payload.total
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(user => user.id !== action.payload)
            state.footer.total -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.users;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadUserAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove, add } = userSlice.actions
export const selectUsers = (state: ReduxState) => state.user.value;
export const usersPagination = (state: ReduxState) => state.user.footer;

export const removeUser = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteUserAsync(id));
        const { data } = await fetchLoadUsers(input)
        if (!data.users.length || data.users.length === 1 || pages === 1) return
        dispatch(add(data))
    } catch (error) {
        console.log(error)
    }
}

export default userSlice.reducer