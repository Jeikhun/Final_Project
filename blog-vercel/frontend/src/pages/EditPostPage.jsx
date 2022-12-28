import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '.././axios';
import { updatePost } from '../redux/slices/postSlice';
import SimpleMDE from "react-simplemde-editor";

import 'easymde/dist/easymde.min.css';

export const EditPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
    }, [params.id]);

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            dispatch(updatePost(updatedPost))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    };

    useEffect(() => {
        fetchPost()
    }, [fetchPost]);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            minHeight: '400px',
            autofocus: true,
            placeholder: 'Text',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >

            <label className='text-s text-white opacity-70'>
                Title:
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    placeholder='Title...'
                    className='mt-1 mb-3 text-l font-medium text-black w-full rounded-lg border py-2 px-2 text-xs outline-none placeholder:text-gray'
                />
            </label>

            <label className='text-l text-white opacity-70'>
                Text:
                <div>
                    <SimpleMDE
                        className='mt-1 text-black'
                        value={text}
                        onChange={setText}
                        options={options}
                    />
                </div>
            </label>


            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Update
                </button>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
