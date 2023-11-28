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
    async (params: UserParams) => {
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
        add: (state, action: PayloadAction<UsersType>) => {
            state.value.push(action.payload)
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
export const selectUsers = (state: ReduxState) => state.counter.value;
export const usersPagination = (state: ReduxState) => state.counter.footer;

export const removeUser = (id: number, input: UserParams): ReduxThunkAction => async (dispatch, getState) => {
    dispatch(remove(Number(id)));
    const {data} = await fetchLoadUsers(input)
    dispatch(add(data.users[0]))
    await dispatch(deleteUserAsync(id));
}

export default userSlice.reducer