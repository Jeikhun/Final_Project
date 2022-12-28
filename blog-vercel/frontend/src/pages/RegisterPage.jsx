import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, checkAuthMe } from '../redux/slices/authSlice';
import { toast } from 'react-toastify'

import { AiFillEye } from 'react-icons/ai';



export const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkAuthMe);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(userRegister({ username, email, password, confirmPassword }))
            // setUsername('')
            // setMail('')
            // setPassword('')
        } catch (error) {
            console.log(error)
        }
    };


    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const confirmTogglePassword = () => {
        setPasswordConfirmShown(!passwordConfirmShown);
    };


    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Registration</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                E-mail:
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder='Email'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Password:
                <div className='flex items-center'>
                    <input
                        type={passwordShown ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                    />
                    <AiFillEye
                        className='text-2xl ml-3'
                        onClick={togglePassword}
                    />
                </div>
            </label>

            <label className='text-xs text-gray-400'>
                Confirm password:
                <div className='flex items-center'>
                    <input
                        type={passwordConfirmShown ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Password'
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                    />
                    <AiFillEye
                        className='text-2xl ml-3'
                        onClick={confirmTogglePassword}
                    />
                </div>
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Sign In
                </button>
                <Link
                    to='/login'
                    className='flex justify-center items-center text-xs text-white'
                >
                    Already have an account ?
                </Link>
            </div>
        </form>
    );
};
