import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams, useNavigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {toast} from 'react-toastify';

import axios from '.././axios';

import {deletePost} from '../redux/slices/postSlice';
import {createComment, getPostComments} from '../redux/slices/commentSlice';
import {checkAuthMe} from '../redux/slices/authSlice';

import {CommentItem} from '../components/CommentItem';

import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from 'react-icons/ai';

import Moment from 'react-moment';


export const OnePostPage = () => {

    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const {user} = useSelector((state) => state.auth)
    const {comments} = useSelector((state) => state.comment)

    const isAuth = useSelector(checkAuthMe);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removePost = () => {
        try {
            dispatch(deletePost(params.id));
            navigate('/posts');
        } catch (err) {
            console.log(err)
        }
    };


    const submitComment = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    };

    const canNotSubmitComment = () => {
        toast('Login for add comments')
        setComment('')
    };

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch]);

    const fetchPost = useCallback(async () => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(() => {
        fetchComments()
    }, [fetchComments]);


    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
                <Link className='flex' to='/'>Back</Link>
            </button>
            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div className={
                            post?.imageUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
                        }>
                            {post?.imageUrl && (
                                <img
                                    src={`http://localhost:2022/${post.imageUrl}`}
                                    alt='img'
                                    className='object-cover w-full'
                                />
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-white opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-white opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY, h:mm a'/>
                            {/* <Moment date={post.updatedAt} format='D MMM YYYY, h:mm a' /> */}
                        </div>
                    </div>

                    <div className='text-white text-xl uppercase'>
                        {post.title}
                    </div>

                    <div className='my-2 bg-white h-1 w-full'></div>

                    <ReactMarkdown
                        className='text-white'
                        children={post.text}
                    />


                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye/> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiOutlineMessage/>{' '}
                                <span>{post.comments?.length}</span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button
                                    className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit/>
                                    </Link>
                                </button>
                                <button
                                    onClick={removePost}
                                    className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                    <AiFillDelete/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment'
                            className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                        />
                        {isAuth ?
                            <button
                                type='submit'
                                onClick={submitComment}
                                className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                            >
                                Comment
                            </button>
                            :
                            <button
                                type='submit'
                                onClick={canNotSubmitComment}
                                className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                            >
                                Comment
                            </button>
                        }

                    </form>
                    <div className=''>
                        {comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt}/>
                        ))}
                        {/*{user?._id === post.author && (*/}
                        {/*    <div className='flex gap-3'>*/}
                        {/*        <button*/}
                        {/*            className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>*/}
                        {/*            <Link to={'/'}>*/}
                        {/*                <AiTwotoneEdit/>*/}
                        {/*            </Link>*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            onClick={}*/}
                        {/*            className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>*/}
                        {/*            <AiFillDelete/>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    );
};
