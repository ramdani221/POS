import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser, fetchDeleteUser, fetchGetUser, fetchLoadUsers, fetchUpdateUser } from "./userAPI";
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
    user: UsersType;
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
    user: {
        id: 0,
        email: '',
        name: '',
        role: ''
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

export const getUserAsync = createAsyncThunk(
    'users/getUserAsync',
    async (id: number) => {
        const { data } = await fetchGetUser(id)
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
            .addCase(getUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const { remove } = userSlice.actions
export const selectUsers = (state: ReduxState) => state.user.value;
export const getUser = (state: ReduxState) => state.user.user;
export const usersPagination = (state: ReduxState) => state.user.footer;

export const removeUser = (id: number, input: Params, pages: number): ReduxThunkAction => async (dispatch, getState) => {
    try {
        dispatch(remove(Number(id)));
        await dispatch(deleteUserAsync(id));
        await dispatch(loadUserAsync(input));
    } catch (error) {
        return error
    }
}

export default userSlice.reducer