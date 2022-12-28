import React, { useState, useEffect } from 'react';
import axios from '.././axios';
import { PostItem } from '../components/PostItem';


export const UserPostsPage = () => {

    const [posts, setPosts] = useState([])

    const getMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyPosts()
    }, [])

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {posts?.map((post, idx) => (
                <PostItem post={post} key={idx} />
            ))}
        </div>
    );
};
