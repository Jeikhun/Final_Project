import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import fileUpload from 'express-fileupload';

import {register, login, authMe} from "./controllers/auth.js";
import {checkAuth} from "./utils/checkAuth.js";
import {
    createPost,
    getAllPosts,
    getOnePosts,
    getMyPosts,
    deletePost,
    updatePost,
    getPostComments
} from './controllers/posts.js';
import {createComment} from './controllers/comments.js';


const app = express();

mongoose.set('strictQuery', false)
    .connect(`mongodb+srv://admin:admin2022@alatoshnikicluster.cly0zgi.mongodb.net/alatoshniki_blog?retryWrites=true&w=majority`)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERR', err))


app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));


app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/me', checkAuth, authMe);

app.post('/posts', checkAuth, createPost);
app.get('/posts', getAllPosts);
app.get('/posts/:id', getOnePosts);
app.get('/posts/user/me', checkAuth, getMyPosts);
app.delete('/posts/:id', checkAuth, deletePost);
app.put('/posts/:id', checkAuth, updatePost);
app.get('/posts/comments/:id', getPostComments);

app.post('/comments/:id', checkAuth, createComment);


app.listen(2022, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});