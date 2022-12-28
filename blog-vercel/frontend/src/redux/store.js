import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice,
    },
})
