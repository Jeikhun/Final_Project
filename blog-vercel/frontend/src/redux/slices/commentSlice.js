import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';


export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({postId, comment, username}) => {
        try {
            const {data} = await axios.post(`/comments/${postId}`, {
                username,
                postId,
                comment
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
);


export const getPostComments = createAsyncThunk(
    'comment/getPostComments',
    async (postId) => {
        try {
            const {data} = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

const initialState = {
    comments: [],
    loading: false,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },

        [getPostComments.pending]: (state) => {
            state.loading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.comments.username = action.payload.username
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default commentSlice.reducer
