import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'


export const userRegister = createAsyncThunk('auth/userRegister', async ({ username, email, password, confirmPassword }) => {
    try {
        const { data } = await axios.post('/auth/register', {
            username,
            email,
            password,
            confirmPassword,
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error)
    }
});

export const userLogin = createAsyncThunk('auth/userLogin', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/auth/login', {
            username,
            password,
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error)
    }
});

export const authMe = createAsyncThunk('auth/authMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});


const initialState = {
    data: null,
    status: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: {
        [userRegister.pending]: (state) => {
            state.isLoading = true;
            state.status = null
        },
        [userRegister.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [userRegister.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        [userLogin.pending]: (state) => {
            state.isLoading = true;
            state.status = null
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [userLogin.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        [authMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [authMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [authMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    },
});

export const checkAuthMe = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export default authSlice.reducer;
